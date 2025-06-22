import { FiBarChart2, FiCalendar, FiList, FiPieChart, FiUsers } from "react-icons/fi";
import { ActiveTab } from "../hooks/useDashboardFilters";

interface TabNavigationProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  teamMembersCount: number;
  tasksCount: number;
  projectsCount: number;
}

export function TabNavigation({
  activeTab,
  onTabChange,
  teamMembersCount,
  tasksCount,
  projectsCount,
}: TabNavigationProps) {
  return (
    <div className="tabs tabs-lifted">
      <button
        onClick={() => onTabChange("overview")}
        className={`tab tab-lg ${activeTab === "overview" ? "tab-active" : ""}`}
      >
        <FiBarChart2 className="mr-2" />
        Overview
      </button>
      <button onClick={() => onTabChange("team")} className={`tab tab-lg ${activeTab === "team" ? "tab-active" : ""}`}>
        <FiUsers className="mr-2" />
        Team
        <div className="badge badge-sm ml-2">{teamMembersCount}</div>
      </button>
      <button
        onClick={() => onTabChange("tasks")}
        className={`tab tab-lg ${activeTab === "tasks" ? "tab-active" : ""}`}
      >
        <FiList className="mr-2" />
        Tasks
        <div className="badge badge-sm ml-2">{tasksCount}</div>
      </button>
      <button
        onClick={() => onTabChange("projects")}
        className={`tab tab-lg ${activeTab === "projects" ? "tab-active" : ""}`}
      >
        <FiCalendar className="mr-2" />
        Projects
        <div className="badge badge-sm ml-2">{projectsCount}</div>
      </button>
      <button
        onClick={() => onTabChange("analytics")}
        className={`tab tab-lg ${activeTab === "analytics" ? "tab-active" : ""}`}
      >
        <FiPieChart className="mr-2" />
        Analytics
      </button>
    </div>
  );
}
