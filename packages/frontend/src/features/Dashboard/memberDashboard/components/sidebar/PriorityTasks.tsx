import { FiClock, FiFlag } from "react-icons/fi";
import { TaskData } from "../../interfaces/DashboardInterfaces";

interface PriorityTasksProps {
  tasks: TaskData[];
  maxItems?: number;
  onTaskAction?: (action: string, taskId: number) => void;
}

export function PriorityTasks({ tasks, maxItems = 4, onTaskAction }: PriorityTasksProps) {
  const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };

  const priorityTasks = tasks
    .filter((task) => task.status !== "completed" && (task.priority === "critical" || task.priority === "high"))
    .sort((a, b) => {
      // Sort by priority first, then by due date
      const priorityDiff =
        (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) -
        (priorityOrder[a.priority as keyof typeof priorityOrder] || 0);
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(a.due).getTime() - new Date(b.due).getTime();
    })
    .slice(0, maxItems);

  const getPriorityIcon = (priority: string) => (priority === "critical" ? "🔥" : "⚠️");

  const getPriorityColor = (priority: string) =>
    priority === "critical" ? "border-l-error bg-error/5" : "border-l-warning bg-warning/5";

  const getDaysUntilDue = (dueDate: string) => {
    const days = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return "Due today";
    if (days === 1) return "Due tomorrow";
    return `${days} days left`;
  };

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiFlag className="h-5 w-5 mr-2 text-warning" />
          Priority Tasks
          {priorityTasks.length > 0 && <div className="badge badge-warning badge-sm ml-2">{priorityTasks.length}</div>}
        </h3>

        {priorityTasks.length === 0 ? (
          <div className="flex items-center justify-center h-32">
            <p className="text-base-content/70 text-center">No high priority tasks</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {priorityTasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-3 rounded-lg border-l-4 ${getPriorityColor(task.priority)} hover:shadow-sm transition-all cursor-pointer`}
                  onClick={() => onTaskAction?.("view", task.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onTaskAction?.("view", task.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPriorityIcon(task.priority)}</span>
                      <h4 className="text-sm font-medium truncate" title={task.title}>
                        {task.title}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-base-content/70">{task.project}</span>
                      <span className="flex items-center gap-1 text-base-content/70">
                        <FiClock className="h-3 w-3" />
                        {getDaysUntilDue(task.due)}
                      </span>
                    </div>

                    {task.progress > 0 && (
                      <div className="space-y-1">
                        <progress
                          className={`progress progress-xs w-full ${
                            task.priority === "critical" ? "progress-error" : "progress-warning"
                          }`}
                          value={task.progress}
                          max="100"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="divider my-2" />
            <button
              type="button"
              className="btn btn-ghost btn-sm w-full"
              onClick={() => onTaskAction?.("viewAllPriority", 0)}
            >
              View All Priority Tasks
            </button>
          </>
        )}
      </div>
    </div>
  );
}

PriorityTasks.defaultProps = {
  maxItems: 4,
  onTaskAction: () => {},
};
