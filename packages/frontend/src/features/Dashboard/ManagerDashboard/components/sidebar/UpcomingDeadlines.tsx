/* eslint-disable no-nested-ternary */
import { FiClock } from "react-icons/fi";
import { ManagerTask, ManagerProject } from "../../type";

interface UpcomingDeadlinesProps {
  tasks: ManagerTask[];
  projects: ManagerProject[];
}

export function UpcomingDeadlines({ tasks, projects }: UpcomingDeadlinesProps) {
  const deadlineItems = [
    ...tasks,
    ...projects.map((p) => ({
      id: `project-${p.id}`,
      title: p.name,
      due: p.deadline,
      assignedTo: `${p.teamSize} members`,
      priority: p.priority,
      type: "project",
    })),
  ]
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .slice(0, 5);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiClock className="h-5 w-5 mr-2" />
          Upcoming Deadlines
        </h3>
        <div className="space-y-3">
          {deadlineItems.map((item) => {
            const daysUntilDue = Math.ceil(
              (new Date(item.due).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
            );
            const isOverdue = daysUntilDue < 0;
            const isUrgent = daysUntilDue <= 2 && daysUntilDue >= 0;

            return (
              <div key={item.id} className="flex items-start gap-3">
                <div
                  className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                    isOverdue ? "bg-error" : isUrgent ? "bg-warning" : "bg-info"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.title}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-base-content/70">{item.assignedTo}</p>
                    <span
                      className={`text-xs font-medium ${
                        isOverdue ? "text-error" : isUrgent ? "text-warning" : "text-info"
                      }`}
                    >
                      {isOverdue
                        ? `${Math.abs(daysUntilDue)} days overdue`
                        : isUrgent
                          ? "Due soon"
                          : `${daysUntilDue} days left`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="divider my-2" />
        <button type="button" className="btn btn-ghost btn-sm w-full">
          View All Deadlines
        </button>
      </div>
    </div>
  );
}
