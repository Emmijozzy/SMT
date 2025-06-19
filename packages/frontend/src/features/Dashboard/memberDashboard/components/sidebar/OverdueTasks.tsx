/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { MouseEvent } from "react";
import { FiAlertTriangle, FiClock, FiUser } from "react-icons/fi";
import { TaskData } from "../../interfaces/DashboardInterfaces";

interface OverdueTasksProps {
  tasks: TaskData[];
  maxItems?: number;
  onTaskAction?: (action: string, taskId: number) => void;
}

export function OverdueTasks({ tasks, maxItems = 5, onTaskAction }: OverdueTasksProps) {
  const getOverdueInfo = (dueDate: string) => {
    const daysOverdue = Math.abs(
      Math.ceil((new Date().getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24)),
    );

    return {
      daysOverdue,
      overdueText: daysOverdue === 1 ? "1 day overdue" : `${daysOverdue} days overdue`,
      urgencyLevel: daysOverdue > 7 ? "critical" : daysOverdue > 3 ? "high" : "medium",
    };
  };

  const overdueTasks = tasks
    .filter((task) => {
      const isOverdue = new Date(task.due).getTime() < new Date().getTime();
      return isOverdue && task.status !== "completed";
    })
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()) // Oldest overdue first
    .slice(0, maxItems);

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case "critical":
        return "bg-error";
      case "high":
        return "bg-warning";
      default:
        return "bg-orange-500";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "critical":
        return "badge-error";
      case "high":
        return "badge-warning";
      case "medium":
        return "badge-info";
      default:
        return "badge-neutral";
    }
  };

  const handleTaskClick = (taskId: number) => {
    onTaskAction?.("view", taskId);
  };

  const handleStartTask = (e: MouseEvent, taskId: number) => {
    e.stopPropagation();
    onTaskAction?.("start", taskId);
  };

  return (
    <div className="card bg-base-100 shadow-sm border-l-4 border-l-error">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center text-error">
          <FiAlertTriangle className="h-5 w-5 mr-2" />
          Overdue Tasks
          {overdueTasks.length > 0 && <div className="badge badge-error badge-sm ml-2">{overdueTasks.length}</div>}
        </h3>

        {overdueTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <div className="text-success mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-success font-medium">Great job!</p>
            <p className="text-base-content/70 text-sm">No overdue tasks</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {overdueTasks.map((task) => {
                const overdueInfo = getOverdueInfo(task.due);

                return (
                  <div
                    key={task.id}
                    className="p-3 rounded-lg border border-error/20 bg-error/5 hover:bg-error/10 transition-colors cursor-pointer"
                    onClick={() => handleTaskClick(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleTaskClick(task.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getUrgencyColor(overdueInfo.urgencyLevel)} animate-pulse`}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium truncate pr-2" title={task.title}>
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            <div className={`badge badge-xs ${getPriorityBadgeClass(task.priority)}`}>
                              {task.priority}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-base-content/70 flex items-center gap-1">
                              <FiUser className="h-3 w-3" />
                              {task.project}
                            </span>
                            <span className="text-error font-medium flex items-center gap-1">
                              <FiClock className="h-3 w-3" />
                              {overdueInfo.overdueText}
                            </span>
                          </div>

                          {task.assignedBy && (
                            <div className="text-xs text-base-content/60">Assigned by: {task.assignedBy}</div>
                          )}

                          {task.progress > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <progress
                                className="progress progress-error progress-xs w-full"
                                value={task.progress}
                                max="100"
                              />
                            </div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <button
                              type="button"
                              className="btn btn-error btn-xs flex-1"
                              onClick={(e) => handleStartTask(e, task.id)}
                            >
                              Start Now
                            </button>
                            {/* <button
                              type="button"
                              className="btn btn-outline btn-error btn-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                onTaskAction?.("reschedule", task.id);
                              }}
                            >
                              Reschedule
                            </button> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}{" "}
            </div>

            <div className="divider my-2" />

            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-error btn-sm flex-1"
                onClick={() => onTaskAction?.("viewAllOverdue", 0)}
              >
                View All Overdue
              </button>
              {/* <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={() => onTaskAction?.("bulkReschedule", 0)}
              >
                Bulk Reschedule
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

OverdueTasks.defaultProps = {
  onTaskAction: undefined,
  maxItems: 5,
};
