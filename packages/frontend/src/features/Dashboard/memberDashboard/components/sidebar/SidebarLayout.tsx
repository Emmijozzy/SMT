import { ReactNode } from "react";
import { ActivityData, ChartData, TaskData } from "../../interfaces/DashboardInterfaces";
import { PriorityTasks } from "./PriorityTasks";
import { RecentActivity } from "./RecentActivity";
import { TaskDistributionChart } from "./TaskDistributionChart";
import { UpcomingDeadlines } from "./UpcomingDeadlines";

interface SidebarLayoutProps {
  tasks: TaskData[];
  recentActivity: ActivityData[];
  chartData: ChartData;
  onTaskAction: (action: string, taskId: number) => void;
  children?: ReactNode;
}
export function SidebarLayout({ tasks, recentActivity, chartData, onTaskAction, children }: SidebarLayoutProps) {
  const hasPriorityTasks = tasks.some(
    (task) => task.status !== "completed" && (task.priority === "critical" || task.priority === "high"),
  );

  return (
    <div className="space-y-6">
      {/* Task Distribution Chart */}
      <TaskDistributionChart data={chartData.taskStatusData as unknown as ChartData} />

      {/* Priority Tasks - Show if there are any high/critical priority tasks */}
      {hasPriorityTasks && <PriorityTasks tasks={tasks} onTaskAction={onTaskAction} />}

      {/* Recent Activity */}
      <RecentActivity activities={recentActivity} />

      {/* Upcoming Deadlines */}
      <UpcomingDeadlines tasks={tasks} />

      {/* Team Leaderboard */}
      {/* <TeamLeaderboard /> */}

      {/* Additional custom sidebar content */}
      {children}
    </div>
  );
}
SidebarLayout.defaultProps = {
  children: null,
};
