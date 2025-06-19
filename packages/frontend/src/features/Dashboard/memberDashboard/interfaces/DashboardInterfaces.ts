export interface MetricsData {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  rejectedTasks: number;
  productivity: number;
  upcomingDeadlines: number;
  hoursWorked: number;
  weeklyGoal: number;
  completionRate: number;
  averageTaskTime: number;
  streakDays: number;
  teamRanking: number;
}

export interface TaskData {
  id: number;
  title: string;
  project: string;
  due: string;
  priority: string;
  status: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  assignedBy: string;
}

export interface ProjectData {
  id: number;
  name: string;
  progress: number;
  role: string;
  deadline: string;
  status: string;
  teamSize: number;
  tasksCompleted: number;
  totalTasks: number;
  priority: string;
}

export interface MessageData {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  time: string;
  unread: boolean;
  type: string;
}

export interface ActivityData {
  id: number;
  action: string;
  item: string;
  time: string;
  type: string;
}

// Chart dataset interfaces
export interface WeeklyActivityDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  borderRadius: number;
  borderSkipped: boolean;
}

export interface ProductivityDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  tension: number;
  fill: boolean;
}

export interface TaskStatusDataset {
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
  hoverOffset: number;
}

// Main chart data interfaces
export interface WeeklyActivityData {
  labels: string[];
  datasets: WeeklyActivityDataset[];
}

export interface ProductivityData {
  labels: string[];
  datasets: ProductivityDataset[];
}

export interface TaskStatusData {
  labels: string[];
  datasets: TaskStatusDataset[];
}

// Update the existing ChartData interface
export interface ChartData {
  weeklyActivityData: WeeklyActivityData;
  productivityData: ProductivityData;
  taskStatusData: TaskStatusData;
}

export interface DashboardActions {
  onTaskAction?: (action: string, taskId: number) => void;
  onProjectAction?: (action: string, projectId: number) => void;
  onMessageAction?: (action: string, messageId: number) => void;
  onFilterChange?: (filter: string) => void;
  onExport?: () => void;
}
