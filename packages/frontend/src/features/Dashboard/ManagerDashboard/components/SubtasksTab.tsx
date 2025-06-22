/* eslint-disable no-nested-ternary */
import {
  FiDownload,
  FiEdit,
  FiEye,
  FiFilter,
  FiFlag,
  FiMessageSquare,
  FiMoreVertical,
  FiPlay,
  FiUser,
} from "react-icons/fi";
import { ManagerTask } from "../hooks/useManagerTasks";

interface TasksTabProps {
  tasks: ManagerTask[];
  onCreateTask: () => void;
  onUpdateTask: (taskId: number, updates: Partial<ManagerTask>) => void;
  onDeleteTask: (taskId: number) => void;
}

export function SubtasksTab({ tasks, onCreateTask, onUpdateTask, onDeleteTask }: TasksTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={onCreateTask}>
            <FiPlay className="h-4 w-4" />
            Create Task
          </button>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
              <FiFilter className="h-4 w-4" />
              Filter
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>All Tasks</a>
              </li>
              <li>
                <a>Critical Priority</a>
              </li>
              <li>
                <a>Overdue</a>
              </li>
              <li>
                <a>In Progress</a>
              </li>
            </ul>
          </div>
          <button className="btn btn-outline btn-sm">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="card bg-base-100 border hover:shadow-md transition-all duration-200">
            <div className="card-body p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-base">{task.title}</h3>
                    <div
                      className={`badge badge-sm ${
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
                    </div>
                  </div>

                  <p className="text-sm text-base-content/70 mb-3">{task.description}</p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="badge badge-outline badge-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-base-content/70 mb-3">
                    <div>
                      <span className="font-medium">Project:</span> {task.project}
                    </div>
                    <div>
                      <span className="font-medium">Assigned to:</span> {task.assignedTo}
                    </div>
                    <div>
                      <span className="font-medium">Due:</span> {new Date(task.due).toLocaleDateString()}
                    </div>
                  </div>

                  {task.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <progress className="progress progress-primary w-full" value={task.progress} max="100" />
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="text-base-content/70">Time:</span>
                      <span className="ml-1">
                        {task.actualHours}h / {task.estimatedHours}h
                      </span>
                    </div>
                    {task.blockers.length > 0 && (
                      <div className="tooltip" data-tip={task.blockers.join(", ")}>
                        <div className="badge badge-warning badge-sm">
                          <FiFlag className="h-3 w-3 mr-1" />
                          {task.blockers.length} blocker{task.blockers.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <div
                    className={`badge ${
                      task.status === "completed"
                        ? "badge-success"
                        : task.status === "in-progress"
                          ? "badge-info"
                          : task.status === "overdue"
                            ? "badge-error"
                            : "badge-neutral"
                    }`}
                  >
                    {task.status.replace("-", " ")}
                  </div>

                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
                      <FiMoreVertical className="h-4 w-4" />
                    </div>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                      <li>
                        <a>
                          <FiEye className="h-4 w-4" />
                          View Details
                        </a>
                      </li>
                      <li>
                        <a>
                          <FiEdit className="h-4 w-4" />
                          Edit Task
                        </a>
                      </li>
                      <li>
                        <a>
                          <FiUser className="h-4 w-4" />
                          Reassign
                        </a>
                      </li>
                      <li>
                        <a>
                          <FiMessageSquare className="h-4 w-4" />
                          Add Comment
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
