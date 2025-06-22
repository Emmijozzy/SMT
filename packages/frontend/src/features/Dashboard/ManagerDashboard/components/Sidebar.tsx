import { Activity } from "../hooks/useManagerActivity";
import { ManagerMetrics } from "../hooks/useManagerMetrics";
import { TeamMember } from "../hooks/useTeamMembers";
import { ManagerProject, ManagerTask } from "../type";
import { CriticalTasks } from "./sidebar/CriticalTasks";
import { QuickActions } from "./sidebar/QuickActions";
import { TeamActivity } from "./sidebar/TeamActivity";
import { TeamWorkload } from "./sidebar/TeamWorkload";
import { UpcomingDeadlines } from "./sidebar/UpcomingDeadlines";

// Sidebar.tsx
interface SidebarProps {
  metrics: ManagerMetrics;
  teamMembers: TeamMember[];
  tasks: ManagerTask[];
  projects: ManagerProject[];
  activities: Activity[];
  /* taskStatusData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  }; */
}

export function Sidebar({ metrics, teamMembers, tasks, projects, activities /* , taskStatusData */ }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* <TaskStatusChart taskStatusData={taskStatusData} /> */}
      <TeamActivity activities={activities} />
      <CriticalTasks tasks={tasks} />
      <TeamWorkload teamMembers={teamMembers} metrics={metrics} />
      <UpcomingDeadlines tasks={tasks} projects={projects} />
      <QuickActions />
    </div>
  );
}
