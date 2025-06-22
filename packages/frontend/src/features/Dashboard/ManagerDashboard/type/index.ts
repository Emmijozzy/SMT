export interface ManagerMetrics {
  totalSubtasks: number;
  completedSubtasks: number;
  completedSubtasksTrend?: string;
  inProgressSubtasks: number;
  inProgressSubtasksTrend?: string;
  inReviewSubtasks: number;
  inReviewSubtasksTrend?: string;
  overdueSubtasks: number;
  overdueSubtasksTrend?: string;
  teamSize: number;
  teamSizeTrend?: string;
  activeTasks: number;
  activeTasksTrend?: string;
  completionRate: number;
  avgCompletionTime: number;
  teamProductivity: number;
  teamProductivityTrend?: string;
  upcomingDeadlines: number;
  criticalSubtasks: number;
  teamUtilization: number;
  budgetUtilization: number;
  clientSatisfaction: number;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  completedTasks: number;
  overdueTasks: number;
  productivity: number;
  currentTask: string;
  status: "active" | "busy" | "away";
  workload: number;
  lastActive: string;
  skills: string[];
  email: string;
  phone: string;
}

export interface ManagerTask {
  id: number;
  title: string;
  project: string;
  assignedTo: string;
  due: string;
  priority: "critical" | "high" | "medium" | "low";
  status: "completed" | "in-progress" | "pending" | "overdue" | "in-review";
  progress: number;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  description: string;
  blockers: string[];
}

export interface ManagerProject {
  id: number;
  name: string;
  progress: number;
  deadline: string;
  status: "active" | "planning" | "completed" | "on-hold";
  teamSize: number;
  tasksCompleted: number;
  totalTasks: number;
  priority: "high" | "medium" | "low";
  budget: number;
  budgetUsed: number;
  client: string;
  manager: string;
  description: string;
}

export interface Activity {
  id: number;
  user: string;
  action: string;
  item: string;
  time: string;
  type: "success" | "info" | "warning" | "error";
  avatar: string;
}

export interface ChartDataset {
  label?: string;
  data: number[];
  backgroundColor: string | string[];
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  borderSkipped?: boolean;
  hoverOffset?: number;
  tension?: number;
  fill?: boolean;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export type ActiveTab = "overview" | "team" | "tasks" | "projects" | "analytics";
export type TimeFilter = "today" | "week" | "month";
