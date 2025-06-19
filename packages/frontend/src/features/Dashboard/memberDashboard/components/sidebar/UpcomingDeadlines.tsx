/* eslint-disable no-nested-ternary */
import { FiClock } from "react-icons/fi";
import { TaskData } from "../../interfaces/DashboardInterfaces";

interface UpcomingDeadlinesProps {
  tasks: TaskData[];
  maxItems?: number;
}

export function UpcomingDeadlines({ tasks, maxItems = 4 }: UpcomingDeadlinesProps) {
  const getDeadlineInfo = (dueDate: string) => {
    const daysUntilDue = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysUntilDue < 0;
    const isUrgent = daysUntilDue <= 1 && daysUntilDue >= 0;

    return {
      daysUntilDue,
      isOverdue,
      isUrgent,
      statusText: isOverdue
        ? `${Math.abs(daysUntilDue)} days overdue`
        : isUrgent
          ? "Due soon"
          : `${daysUntilDue} days left`,
      statusColor: isOverdue ? "text-error" : isUrgent ? "text-warning" : "text-info",
      dotColor: isOverdue ? "bg-error" : isUrgent ? "bg-warning" : "bg-info",
    };
  };

  const upcomingTasks = tasks
    .filter((task) => task.status !== "completed")
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .slice(0, maxItems);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiClock className="h-5 w-5 mr-2" />
          Upcoming Deadlines
        </h3>

        {upcomingTasks.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-base-content/70 text-center">No upcoming deadlines</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {upcomingTasks.map((task) => {
                const deadlineInfo = getDeadlineInfo(task.due);

                return (
                  <div key={task.id} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${deadlineInfo.dotColor}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" title={task.title}>
                        {task.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-base-content/70">{task.project}</p>
                        <span className={`text-xs font-medium ${deadlineInfo.statusColor}`}>
                          {deadlineInfo.statusText}
                        </span>
                      </div>
                      {task.priority && (
                        <div className="mt-1">
                          <span
                            className={`badge badge-xs ${
                              task.priority === "critical"
                                ? "badge-error"
                                : task.priority === "high"
                                  ? "badge-warning"
                                  : task.priority === "medium"
                                    ? "badge-info"
                                    : "badge-neutral"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="divider my-2" />
            <button type="button" className="btn btn-ghost btn-sm w-full">
              View All Deadlines
            </button>
          </>
        )}
      </div>
    </div>
  );
}

UpcomingDeadlines.defaultProps = {
  maxItems: 4,
};
