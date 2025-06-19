/* eslint-disable indent */
import { FiEdit, FiEye, FiMoreVertical, FiPlay } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  project: string;
  due: string;
  priority: string;
  status: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  assignedBy: string;
}

interface TaskCardProps {
  task: Task;
  onAction?: (action: string, taskId: number) => void;
}

export function TaskCard({ task, onAction }: TaskCardProps) {
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

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "completed":
        return "badge-success";
      case "in-progress":
        return "badge-info";
      case "overdue":
        return "badge-error";
      default:
        return "badge-neutral";
    }
  };

  return (
    <div className="card bg-base-100 border hover:shadow-md transition-all duration-200">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-semibold text-base">{task.title}</h3>
              <div className={`badge badge-sm ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</div>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {task.tags.map((tag) => (
                <span key={`${task.id}-${tag}`} className="badge badge-outline badge-xs">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-base-content/70">
              <div>
                <span className="font-medium">Project:</span> {task.project}
              </div>
              <div>
                <span className="font-medium">Due:</span>
                {new Date(task.due).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Assigned by:</span> {task.assignedBy}
              </div>
            </div>

            {task.progress > 0 && (
              <div className="mt-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <progress className="progress progress-primary w-full" value={task.progress} max="100" />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <div className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status.replace("-", " ")}</div>

            <div className="dropdown dropdown-end">
              <button type="button" className="btn btn-ghost btn-sm btn-circle" aria-label="Task actions">
                <FiMoreVertical className="h-4 w-4" />
              </button>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                <li>
                  <button type="button" onClick={() => onAction?.("view", task.id)}>
                    <FiEye className="h-4 w-4" />
                    View
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onAction?.("edit", task.id)}>
                    <FiEdit className="h-4 w-4" />
                    Edit
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onAction?.("start", task.id)}>
                    <FiPlay className="h-4 w-4" />
                    Start
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TaskCard.defaultProps = {
  onAction: () => {},
};
