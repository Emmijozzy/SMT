/* eslint-disable no-nested-ternary */
import { FiEye, FiFilter, FiList, FiMail, FiMoreVertical, FiUserPlus } from "react-icons/fi";
import { TeamMember } from "../hooks/useTeamMembers";

interface TeamTabProps {
  teamMembers: TeamMember[];
  onUpdateMemberStatus: (memberId: number, status: TeamMember["status"]) => void;
}

export function TeamTab({ teamMembers, onUpdateMemberStatus }: TeamTabProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2">
          <button className="btn btn-primary btn-sm">
            <FiUserPlus className="h-4 w-4" />
            Add Member
          </button>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
              <FiFilter className="h-4 w-4" />
              Filter
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a>All Members</a>
              </li>
              <li>
                <a>Active</a>
              </li>
              <li>
                <a>Busy</a>
              </li>
              <li>
                <a>Available</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="card bg-base-100 border hover:shadow-md transition-all duration-200">
            <div className="card-body p-4">
              <div className="flex items-start gap-4">
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-12 h-12">
                    <span className="text-sm font-bold">{member.avatar}</span>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-base">{member.name}</h3>
                      <p className="text-sm text-base-content/70">{member.role}</p>
                    </div>
                    <div
                      className={`badge badge-sm ${
                        member.status === "active"
                          ? "badge-success"
                          : member.status === "busy"
                            ? "badge-warning"
                            : "badge-neutral"
                      }`}
                    >
                      {member.status}
                    </div>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Productivity</span>
                      <span className="font-medium">{member.productivity}%</span>
                    </div>
                    <progress className="progress progress-primary w-full" value={member.productivity} max="100" />

                    <div className="flex justify-between text-sm">
                      <span>Workload</span>
                      <span className="font-medium">{member.workload}%</span>
                    </div>
                    <progress
                      className={`progress w-full ${
                        member.workload > 90
                          ? "progress-error"
                          : member.workload > 75
                            ? "progress-warning"
                            : "progress-info"
                      }`}
                      value={member.workload}
                      max="100"
                    />
                  </div>

                  <div className="text-xs text-base-content/70 mb-2">
                    <p>
                      <strong>Current:</strong> {member.currentTask}
                    </p>
                    <p>
                      <strong>Last active:</strong> {member.lastActive}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="badge badge-outline badge-xs">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-xs">
                      <span className="text-success font-medium">{member.completedTasks}</span> completed,
                      <span className="text-error font-medium ml-1">{member.overdueTasks}</span> overdue
                    </div>

                    <div className="dropdown dropdown-end">
                      <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
                        <FiMoreVertical className="h-4 w-4" />
                      </div>
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                        <li>
                          <a>
                            <FiEye className="h-4 w-4" />
                            View Profile
                          </a>
                        </li>
                        <li>
                          <a>
                            <FiMail className="h-4 w-4" />
                            Send Message
                          </a>
                        </li>
                        <li>
                          <a>
                            <FiList className="h-4 w-4" />
                            Assign Task
                          </a>
                        </li>
                      </ul>
                    </div>
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
