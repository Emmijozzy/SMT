/* eslint-disable indent */
import { FiUsers } from "react-icons/fi";

interface Project {
  id: number;
  name: string;
  progress: number;
  role: string;
  deadline: string;
  status: string;
  teamSize: number;
  tasksCompleted: number;
  totalTasks: number;
  priority: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "badge-success";
      case "planning":
        return "badge-warning";
      default:
        return "badge-neutral";
    }
  };

  const getProgressClass = (progress: number) => {
    if (progress > 75) return "progress-success";
    if (progress > 50) return "progress-info";
    if (progress > 25) return "progress-warning";
    return "progress-error";
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "badge-error";
      case "medium":
        return "badge-warning";
      default:
        return "badge-info";
    }
  };

  return (
    <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="card-body">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="card-title text-lg">{project.name}</h3>
            <p className="text-sm text-base-content/70">{project.role}</p>
          </div>
          <div className={`badge ${getStatusBadgeClass(project.status)}`}>{project.status}</div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span className="font-semibold">{project.progress}%</span>
            </div>
            <progress
              className={`progress w-full ${getProgressClass(project.progress)}`}
              value={project.progress}
              max="100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="stat bg-base-200/50 rounded-lg p-3">
              <div className="stat-title text-xs">Tasks</div>
              <div className="stat-value text-lg">
                {project.tasksCompleted}/{project.totalTasks}
              </div>
            </div>
            <div className="stat bg-base-200/50 rounded-lg p-3">
              <div className="stat-title text-xs">Team Size</div>
              <div className="stat-value text-lg flex items-center">
                <FiUsers className="h-4 w-4 mr-1" />
                {project.teamSize}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-base-300">
            <div className="text-sm">
              <span className="text-base-content/70">Deadline:</span>
              <span className="font-medium ml-1">{new Date(project.deadline).toLocaleDateString()}</span>
            </div>
            <div className={`badge badge-sm ${getPriorityBadgeClass(project.priority)}`}>
              {project.priority} priority
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
