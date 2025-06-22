import { FiSearch } from "react-icons/fi";

interface DashboardHeaderProps {
  timeFilter: "today" | "week" | "month";
  searchTerm: string;
  onTimeFilterChange: (filter: "today" | "week" | "month") => void;
  onSearchChange: (term: string) => void;
}

export function DashboardHeader({ timeFilter, searchTerm, onTimeFilterChange, onSearchChange }: DashboardHeaderProps) {
  return (
    <div className="navbar flex-col lg:flex-row justify-between bg-base-100 rounded-box shadow-sm mb-6 gap-4 p-4">
      <div className="navbar-start w-full lg:w-auto">
        <div className="flex flex-col">
          <h1 className="text-2xl lg:text-3xl font-bold text-center md:hidden lg:text-left">Manager Dashboard</h1>
          <p className="text-sm text-base-content/70 text-center lg:text-left">
            Manage your team and track project progress
          </p>
        </div>
      </div>

      <div className="navbar-end flex items-center flex-col lg:flex-row gap-4 w-full lg:w-auto">
        <div className="form-control w-full lg:w-auto">
          <div className="input-group input-group-sm ">
            <input
              type="text"
              placeholder="Search..."
              className="input input-bordered input-sm w-full lg:w-64 focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              aria-label="Search"
            />
            <button className="btn btn-square btn-sm bg-base-200 hover:bg-base-300" type="button" aria-label="Search">
              <FiSearch className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Time Filter Tabs */}
        <div className="tabs tabs-boxed bg-base-100 w-full lg:w-fit justify-center">
          {(["today", "week", "month"] as const).map((filter) => (
            <button
              key={filter}
              className={`tab tab-sm transition-all duration-200 hover:bg-base-200 ${timeFilter === filter ? "tab-active" : ""}`}
              onClick={() => onTimeFilterChange(filter)}
              type="button"
              aria-label={`Filter by ${filter}`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
