import { FiAlertCircle } from "react-icons/fi";
import { ManagerTask } from "../../type";

interface CriticalTasksProps {
  tasks: ManagerTask[];
}

export function CriticalTasks({ tasks }: CriticalTasksProps) {
  const criticalTasks = tasks.filter((task) => task.priority === "critical" || task.status === "overdue").slice(0, 4);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiAlertCircle className="h-5 w-5 mr-2 text-error" />
          Critical Tasks
        </h3>
        <div className="space-y-3">
          {criticalTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-3 p-2 rounded-lg bg-error/5 border border-error/20">
              <div
                className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                  task.status === "overdue" ? "bg-error" : "bg-warning"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{task.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-base-content/70">{task.assignedTo}</p>
                  <span className={`text-xs font-medium ${task.status === "overdue" ? "text-error" : "text-warning"}`}>
                    {task.status === "overdue" ? "Overdue" : task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="divider my-2" />
        <button type="button" className="btn btn-ghost btn-sm w-full">
          View All Critical Tasks
        </button>
      </div>
    </div>
  );
}
