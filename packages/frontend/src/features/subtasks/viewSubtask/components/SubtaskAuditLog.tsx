/* eslint-disable no-nested-ternary */
import { format } from "date-fns";
import { Bot, CheckCircle, ClipboardCheck, MessageCircle, User, XCircle } from "lucide-react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import useSubtaskAuditLog from "../hooks/useSubtaskAuditLog";
import { getIconColor } from "../utils/getIconColor";

function SubtaskAuditLog() {
  const { auditLog: logs } = useSubtaskAuditLog();

  return (
    <div className="container mx-auto">
      <div className="w-full mx-auto bg-base-200 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-8">
          <ClipboardCheck className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Subtask Audit Log</h1>
        </div>
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardCheck className="w-16 h-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-500">No audit logs available</h3>
            <p className="text-sm text-gray-400">There are no activities recorded for this subtask yet.</p>
          </div>
        ) : (
          <VerticalTimeline layout="1-column-left" className="custom-timeline">
            {logs.map((log) => {
              const colors = getIconColor(log.action);
              return (
                <VerticalTimelineElement
                  key={log.id}
                  date={format(log.timestamp, "MMM dd, yyyy HH:mm")}
                  iconStyle={{
                    background: colors.bg,
                    color: "#fff",
                    boxShadow: `0 0 0 4px ${colors.shadow}`,
                  }}
                  icon={log.actor.role === "Automated" ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                  contentStyle={{
                    background: "hsl(var(--b1))",
                    boxShadow: "0 3px 10px rgb(0 0 0 / 0.1)",
                    borderRadius: "0.75rem",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid hsl(var(--b1))" }}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg text-primary">{log.action}</h3>
                        <p className="text-sm opacity-70 flex items-center gap-2 capitalize">
                          <User className="w-4 h-4" />
                          {log.actor.name} ({log.actor.role.replace("_", " ")})
                        </p>
                      </div>
                      <span className="badge badge-primary">{log.details?.decision?.replace("_", " ")}</span>
                    </div>

                    {log.details && (
                      <div className="mt-2 space-y-4 divide-y divide-base-300">
                        {log.details.checklist && (
                          <div className="pt-4">
                            <h4 className="font-medium mb-3 flex items-center gap-2">
                              <ClipboardCheck className="w-5 h-5" />
                              Checklist
                            </h4>
                            <div className="grid gap-2">
                              {log.details.checklist.map((item) => (
                                <div
                                  key={item.id}
                                  className={`flex items-center gap-2 p-2 rounded-md ${
                                    item.isChecked ? "bg-base-200" : "opacity-50"
                                  }`}
                                >
                                  {item.isChecked ? (
                                    <CheckCircle
                                      className={`w-5 h-5 ${
                                        item.isApprove ? "text-success" : item.isReject ? "text-error" : "text-warning"
                                      }`}
                                    />
                                  ) : (
                                    <XCircle className="w-5 h-5 text-error" />
                                  )}
                                  <span>{item.checkItem}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {log.details.requiredFields && (
                          <div className="pt-4">
                            <h4 className="font-medium mb-3">Required Fields</h4>
                            <div className="grid gap-3">
                              {log.details.requiredFields.map((field) => (
                                <div key={field.id} className="bg-base-200 p-3 rounded-md">
                                  <span className="font-medium text-sm">{field.field}</span>
                                  {field.input && (
                                    <div className="mt-1">
                                      {field.type === "link" ? (
                                        <a
                                          href={field.input}
                                          className="text-primary hover:underline flex items-center gap-1"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <span className="truncate">{field.input}</span>
                                        </a>
                                      ) : (
                                        <span className="text-sm">{field.input}</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {(log.details.feedback || log.details.comment) && (
                          <div className="pt-4">
                            {log.details.feedback && (
                              <div className="mb-3">
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <MessageCircle className="w-5 h-5" />
                                  Feedback
                                </h4>
                                <p className="text-sm bg-base-200 p-3 rounded-md">{log.details.feedback}</p>
                              </div>
                            )}
                            {log.details.comment && (
                              <div>
                                <h4 className="font-medium mb-2 flex items-center gap-2">
                                  <MessageCircle className="w-5 h-5" />
                                  Comment
                                </h4>
                                <p className="text-sm bg-base-200 p-3 rounded-md">{log.details.comment}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </VerticalTimelineElement>
              );
            })}
          </VerticalTimeline>
        )}
      </div>
    </div>
  );
}

export default SubtaskAuditLog;
