import { useMemo } from "react";
import { ChartData } from "../type";
import { ManagerMetrics } from "./useManagerMetrics";
import { ManagerProject } from "./useManagerProjects";
import { TeamMember } from "./useTeamMembers";

export interface ChartDataReturn {
  taskStatusData: ChartData;
  teamProductivityData: ChartData;
  projectProgressData: ChartData;
  weeklyMetricsData: ChartData;
}

export const useChartData = (
  metrics: ManagerMetrics,
  teamMembers: TeamMember[],
  projects: ManagerProject[],
): ChartDataReturn => {
  const taskStatusData = useMemo(
    () => ({
      labels: ["Completed", "In Progress", "Open", "Overdue", "in Review", "Other"],
      datasets: [
        {
          data: [metrics.completedSubtasks, metrics.inProgressSubtasks, 12, metrics.overdueSubtasks, 12, 20],
          backgroundColor: ["#22C55E", "#3B82F6", "#F59E0B", "#DC2626", "#6366F1", "#A855F7"],
          borderWidth: 0,
          hoverOffset: 8,
        },
      ],
    }),
    [metrics],
  );
  const teamProductivityData = useMemo(
    () => ({
      labels: teamMembers.map((member) => member.name.split(" ")[0]),
      datasets: [
        {
          label: "Productivity %",
          data: teamMembers.map((member) => member.productivity),
          backgroundColor: "#8B5CF6",
          borderRadius: 6,
          borderSkipped: false,
        },
        {
          label: "Workload %",
          data: teamMembers.map((member) => member.workload),
          backgroundColor: "#06B6D4",
          borderRadius: 6,
          borderSkipped: false,
        },
      ],
    }),
    [teamMembers],
  );

  const projectProgressData = useMemo(
    () => ({
      labels: projects.map((project) => project.name.split(" ")[0]),
      datasets: [
        {
          label: "Progress %",
          data: projects.map((project) => project.progress),
          borderColor: "#10B981",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [projects],
  );

  const weeklyMetricsData = useMemo(
    () => ({
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Tasks Completed",
          data: [12, 15, 8, 18, 22, 5, 7],
          backgroundColor: "#10B981",
          borderRadius: 6,
        },
        {
          label: "Tasks Created",
          data: [8, 12, 15, 10, 14, 3, 5],
          backgroundColor: "#3B82F6",
          borderRadius: 6,
        },
      ],
    }),
    [],
  );

  return {
    taskStatusData,
    teamProductivityData,
    projectProgressData,
    weeklyMetricsData,
  };
};
