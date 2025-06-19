/* eslint-disable no-nested-ternary */
import { FiActivity } from "react-icons/fi";
import { ActivityData } from "../../interfaces/DashboardInterfaces";

interface RecentActivityProps {
  activities: ActivityData[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiActivity className="h-5 w-5 mr-2" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === "success" ? "bg-success" : activity.type === "warning" ? "bg-warning" : "bg-info"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-medium">{activity.action}</span>{" "}
                  <span className="text-primary">{activity.item}</span>
                </p>
                <p className="text-xs text-base-content/70">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="divider my-2" />
        <button type="button" className="btn btn-ghost btn-sm w-full">
          View All Activity
        </button>
      </div>
    </div>
  );
}
