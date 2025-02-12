import { format } from "date-fns";
import React from "react";
import { generateDummyLogs, TaskUpdate } from "./TaslLog";

function TaskAuditLog() {
  const [logs, setLogs] = React.useState<TaskUpdate[]>(generateDummyLogs());
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // React.useEffect(() => {
  //   fetchLogs();
  // }, []);

  // const fetchLogs = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3001/api/tasks/123/logs");
  //     const data = await response.json();
  //     setLogs(
  //       data.data.map((log: any) => ({
  //         ...log,
  //         timestamp: new Date(log.timestamp),
  //       })),
  //     );
  //   } catch (err) {
  //     setError("Failed to fetch logs");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Task Audit Log</h1>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
            <div className="flex items-start gap-4">
              <div className="text-sm text-gray-500">{format(log.timestamp, "yyyy-MM-dd HH:mm")}</div>
              <div className="flex-1">
                <div className="font-medium">
                  {log.action} by {log.actor.name} ({log.actor.role})
                </div>

                {log.details && (
                  <div className="mt-2 space-y-2">
                    {log.details.summary && <div>Summary: {log.details.summary}</div>}

                    {log.details.deliverables && <div>Deliverables: {log.details.deliverables.join(", ")}</div>}

                    {log.details.checklist && (
                      <div className="space-y-1">
                        <div className="font-medium">Checklist:</div>
                        {log.details.checklist.map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <span
                              className={`w-5 h-5 flex items-center justify-center rounded-full ${
                                item.completed ? "bg-green-500" : "bg-red-500"
                              } text-white`}
                            >
                              {item.completed ? "✓" : "✗"}
                            </span>
                            {item.label}
                          </div>
                        ))}
                      </div>
                    )}

                    {log.details.feedback && <div>Feedback: {log.details.feedback}</div>}

                    {log.details.decision && <div>Decision: {log.details.decision}</div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskAuditLog;
