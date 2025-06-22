/* eslint-disable no-nested-ternary */
import { FiUsers } from "react-icons/fi";
import { ManagerMetrics, TeamMember } from "../../type";

interface TeamWorkloadProps {
  teamMembers: TeamMember[];
  metrics: ManagerMetrics;
}

export function TeamWorkload({ teamMembers, metrics }: TeamWorkloadProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiUsers className="h-5 w-5 mr-2" />
          Team Workload
        </h3>
        <div className="space-y-3">
          {teamMembers.map((member) => (
            <div key={member.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{member.name.split(" ")[0]}</span>
                <span
                  className={`${
                    member.workload > 90 ? "text-error" : member.workload > 75 ? "text-warning" : "text-success"
                  }`}
                >
                  {member.workload}%
                </span>
              </div>
              <progress
                className={`progress progress-xs w-full ${
                  member.workload > 90
                    ? "progress-error"
                    : member.workload > 75
                      ? "progress-warning"
                      : "progress-success"
                }`}
                value={member.workload}
                max="100"
              />
            </div>
          ))}
        </div>
        <div className="divider my-2" />
        <div className="text-center">
          <div className="stat">
            <div className="stat-title text-xs">Average Utilization</div>
            <div className="stat-value text-lg">{metrics.teamUtilization}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}
