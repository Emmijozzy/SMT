/* eslint-disable no-nested-ternary */
import { FiCalendar, FiEdit, FiEye, FiFileText, FiUsers } from "react-icons/fi";

interface Task {
  taskId: string;
  title: string;
  description?: string;
  assignedTo: string[];
  responsibleTeam: string;
  status: "not started" | "in progress" | "completed" | "closed";
  managerTask: boolean;
  managerId: string;
  priority: "low" | "medium" | "high";
  progress?: number;
  createdBy: string;
  modifiedBy?: string;
  deadlineNotificationSent?: boolean;
  overdueNotificationSent?: boolean;
  dueDate: Date;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
  del_flg: boolean;
  subtasks: string[];
}

interface TasksTabProps {
  tasks: Task[];
  onCreateTask: () => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function TasksTab({ tasks, onCreateTask, onUpdateTask }: TasksTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <button type="button" className="btn btn-primary btn-sm" onClick={onCreateTask}>
            <FiCalendar className="h-4 w-4" />
            New Task
          </button>
          <button type="button" className="btn btn-outline btn-sm">
            <FiFileText className="h-4 w-4" />
            Export Tasks
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <div
            key={task.taskId}
            className="card bg-gradient-to-br from-base-100 to-base-200 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="card-title text-lg">{task.title}</h3>
                  <p className="text-sm text-base-content/70">{task.description}</p>
                </div>
                <div
                  className={`badge ${
                    task.status === "completed"
                      ? "badge-success"
                      : task.status === "in progress"
                        ? "badge-warning"
                        : task.status === "closed"
                          ? "badge-neutral"
                          : "badge-error"
                  }`}
                >
                  {task.status}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span className="font-semibold">{task.progress || 0}%</span>
                    </div>
                    <progress
                      className={`progress w-full ${
                        (task.progress || 0) > 75
                          ? "progress-success"
                          : (task.progress || 0) > 50
                            ? "progress-info"
                            : (task.progress || 0) > 25
                              ? "progress-warning"
                              : "progress-error"
                      }`}
                      value={task.progress || 0}
                      max="100"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="stat bg-base-200/50 rounded-lg p-3">
                      <div className="stat-title text-xs">Subtasks</div>
                      <div className="stat-value text-lg">{task.subtasks.length}</div>
                    </div>
                    <div className="stat bg-base-200/50 rounded-lg p-3">
                      <div className="stat-title text-xs">Assignees</div>
                      <div className="stat-value text-lg flex items-center">
                        <FiUsers className="h-4 w-4 mr-1" />
                        {task.assignedTo.length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Team:</span>
                      <span className="font-medium">{task.responsibleTeam}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Due Date:</span>
                      <span className="font-medium">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Start Date:</span>
                      <span className="font-medium">{new Date(task.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Priority:</span>
                      <div
                        className={`badge badge-sm ${
                          task.priority === "high"
                            ? "badge-error"
                            : task.priority === "medium"
                              ? "badge-warning"
                              : "badge-info"
                        }`}
                      >
                        {task.priority}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-base-300">
                <div className="flex gap-2">
                  <button type="button" className="btn btn-outline btn-sm">
                    <FiEye className="h-4 w-4" />
                    View Details
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline btn-sm"
                    onClick={() => onUpdateTask(task.taskId, {})}
                  >
                    <FiEdit className="h-4 w-4" />
                    Edit
                  </button>
                </div>
                <div className="text-sm text-base-content/70">Created by: {task.createdBy}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
