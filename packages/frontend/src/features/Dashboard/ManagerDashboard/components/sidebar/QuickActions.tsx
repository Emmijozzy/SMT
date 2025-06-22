import { FiUserPlus, FiList, FiCalendar, FiFileText, FiBarChart2 } from "react-icons/fi";

export function QuickActions() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4">Quick Actions</h3>
        <div className="space-y-2">
          <button type="button" className="btn btn-primary btn-sm w-full justify-start">
            <FiUserPlus className="h-4 w-4" />
            Add Team Member
          </button>
          <button type="button" className="btn btn-outline btn-sm w-full justify-start">
            <FiList className="h-4 w-4" />
            Create Task
          </button>
          <button type="button" className="btn btn-outline btn-sm w-full justify-start">
            <FiCalendar className="h-4 w-4" />
            Schedule Meeting
          </button>
          <button type="button" className="btn btn-outline btn-sm w-full justify-start">
            <FiFileText className="h-4 w-4" />
            Generate Report
          </button>
          <button type="button" className="btn btn-outline btn-sm w-full justify-start">
            <FiBarChart2 className="h-4 w-4" />
            View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}
