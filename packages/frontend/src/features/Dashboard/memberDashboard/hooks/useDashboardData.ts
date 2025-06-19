import { useCallback, useEffect, useState } from "react";
import {
  ActivityData,
  ChartData,
  MessageData,
  MetricsData,
  ProductivityData,
  ProjectData,
  TaskData,
  TaskStatusData,
  WeeklyActivityData,
} from "../interfaces/DashboardInterfaces";

interface DashboardDataState {
  metrics: MetricsData | null;
  tasks: TaskData[];
  projects: ProjectData[];
  messages: MessageData[];
  recentActivity: ActivityData[];
  chartData: ChartData | null;
}

interface DashboardDataActions {
  loading: boolean;
  error: string | null;
  refreshMetrics: () => Promise<void>;
  refreshTasks: () => Promise<void>;
  refreshProjects: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  refreshRecentActivity: () => Promise<void>;
  refreshChartData: () => Promise<void>;
  refreshAllData: () => Promise<void>;
}

type UseDashboardDataReturn = DashboardDataState & DashboardDataActions;

export const useDashboardData = (): UseDashboardDataReturn => {
  const [state, setState] = useState<DashboardDataState>({
    metrics: null,
    tasks: [],
    projects: [],
    messages: [],
    recentActivity: [],
    chartData: null,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Mock API service - replace with actual API calls
  const apiService = {};

  const handleError = (error: unknown, operation: string) => {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    setError(`Failed to ${operation}: ${errorMessage}`);
    console.error(`Error ${operation}:`, error);
  };

  const getMetrics = useCallback(
    async (): Promise<MetricsData> => ({
      totalTasks: 24,
      completedTasks: 18,
      inProgressTasks: 4,
      overdueTasks: 2,
      rejectedTasks: 1,
      productivity: 87,
      upcomingDeadlines: 5,
      hoursWorked: 32,
      weeklyGoal: 40,
      completionRate: 75,
      averageTaskTime: 2.5,
      streakDays: 7,
      teamRanking: 3,
    }),
    [],
  );

  const getTasks = useCallback(
    async (): Promise<TaskData[]> => [
      {
        id: 1,
        title: "Implement user authentication system",
        project: "Website Redesign",
        due: "2024-01-15",
        priority: "high",
        status: "in-progress",
        progress: 65,
        estimatedHours: 8,
        actualHours: 5.2,
        tags: ["Frontend", "Security"],
        assignedBy: "Sarah Johnson",
      },
      {
        id: 2,
        title: "Review pull request #142 - API endpoints",
        project: "Mobile App",
        due: "2024-01-12",
        priority: "medium",
        status: "pending",
        progress: 0,
        estimatedHours: 2,
        actualHours: 0,
        tags: ["Backend", "Review"],
        assignedBy: "Mike Chen",
      },
      {
        id: 3,
        title: "Update API documentation",
        project: "API Development",
        due: "2024-01-18",
        priority: "low",
        status: "not-started",
        progress: 0,
        estimatedHours: 4,
        actualHours: 0,
        tags: ["Documentation"],
        assignedBy: "Alex Wilson",
      },
      {
        id: 4,
        title: "Fix critical login page bugs",
        project: "Website Redesign",
        due: "2024-01-10",
        priority: "critical",
        status: "overdue",
        progress: 30,
        estimatedHours: 6,
        actualHours: 8,
        tags: ["Frontend", "Bugfix"],
        assignedBy: "Sarah Johnson",
      },
    ],
    [],
  );

  const getProjects = useCallback(
    async (): Promise<ProjectData[]> => [
      {
        id: 1,
        name: "Website Redesign",
        progress: 65,
        role: "Frontend Developer",
        deadline: "2024-02-15",
        status: "active",
        teamSize: 6,
        tasksCompleted: 12,
        totalTasks: 18,
        priority: "high",
      },
      {
        id: 2,
        name: "Mobile App Development",
        progress: 42,
        role: "UI Developer",
        deadline: "2024-03-30",
        status: "active",
        teamSize: 4,
        tasksCompleted: 8,
        totalTasks: 19,
        priority: "medium",
      },
      {
        id: 3,
        name: "API Optimization",
        progress: 28,
        role: "Backend Support",
        deadline: "2024-02-28",
        status: "planning",
        teamSize: 3,
        tasksCompleted: 3,
        totalTasks: 11,
        priority: "low",
      },
    ],
    [],
  );

  const getMessages = useCallback(
    async (): Promise<MessageData[]> => [
      {
        id: 1,
        sender: "Alex Johnson",
        avatar: "AJ",
        content: "Can you review the latest design mockups? I've updated the user flow based on our last discussion.",
        time: "2 hours ago",
        unread: true,
        type: "request",
      },
      {
        id: 2,
        sender: "Sarah Williams",
        avatar: "SW",
        content: "Great work on the authentication module! Meeting moved to 3pm tomorrow to discuss next steps.",
        time: "5 hours ago",
        unread: false,
        type: "update",
      },
      {
        id: 3,
        sender: "Michael Chen",
        avatar: "MC",
        content: "Your feedback on the API docs was very helpful. I've implemented the suggested changes.",
        time: "1 day ago",
        unread: false,
        type: "feedback",
      },
    ],
    [],
  );

  const getRecentActivity = useCallback(
    async (): Promise<ActivityData[]> => [
      { id: 1, action: "Completed task", item: "User authentication", time: "2 hours ago", type: "success" },
      { id: 2, action: "Started working on", item: "API documentation", time: "4 hours ago", type: "info" },
      { id: 3, action: "Commented on", item: "Pull request #142", time: "6 hours ago", type: "info" },
      { id: 4, action: "Submitted for review", item: "Login page fixes", time: "1 day ago", type: "warning" },
    ],
    [],
  );

  const getChartData = useCallback(
    async (): Promise<ChartData> => ({
      weeklyActivityData: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Tasks Completed",
            data: [3, 5, 2, 4, 6, 1, 2],
            backgroundColor: "#3B82F6",
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: "Hours Worked",
            data: [6, 8, 4, 7, 8, 2, 3],
            backgroundColor: "#10B981",
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      } as WeeklyActivityData,
      productivityData: {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
          {
            label: "Productivity Score",
            data: [75, 82, 78, 87],
            borderColor: "#8B5CF6",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            tension: 0.4,
            fill: true,
          },
        ],
      } as ProductivityData,
      taskStatusData: {
        labels: ["Completed", "In Progress", "Pending", "Overdue"],
        datasets: [
          {
            data: [19, 4, 2, 2],
            backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
            borderWidth: 0,
            hoverOffset: 8,
          },
        ],
      } as TaskStatusData,
    }),
    [],
  );

  const refreshMetrics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const metrics = await getMetrics();
      setState((prev) => ({ ...prev, metrics }));
    } catch (error) {
      handleError(error, "fetch metrics");
    } finally {
      setLoading(false);
    }
  }, [getMetrics]);

  const refreshTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const tasks = await getTasks();
      setState((prev) => ({ ...prev, tasks }));
    } catch (error) {
      handleError(error, "fetch tasks");
    } finally {
      setLoading(false);
    }
  }, [getTasks]);

  const refreshProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const projects = await getProjects();
      setState((prev) => ({ ...prev, projects }));
    } catch (error) {
      handleError(error, "fetch projects");
    } finally {
      setLoading(false);
    }
  }, [getProjects]);

  const refreshMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const messages = await getMessages();
      setState((prev) => ({ ...prev, messages }));
    } catch (error) {
      handleError(error, "fetch messages");
    } finally {
      setLoading(false);
    }
  }, [getMessages]);

  const refreshRecentActivity = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const recentActivity = await getRecentActivity();
      setState((prev) => ({ ...prev, recentActivity }));
    } catch (error) {
      handleError(error, "fetch recent activity");
    } finally {
      setLoading(false);
    }
  }, [getRecentActivity]);

  const refreshChartData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const chartData = await getChartData();
      setState((prev) => ({ ...prev, chartData }));
    } catch (error) {
      handleError(error, "fetch chart data");
    } finally {
      setLoading(false);
    }
  }, [getChartData]);

  const refreshAllData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [metrics, tasks, projects, messages, recentActivity, chartData] = await Promise.all([
        getMetrics(),
        getTasks(),
        getProjects(),
        getMessages(),
        getRecentActivity(),
        getChartData(),
      ]);

      setState({
        metrics,
        tasks,
        projects,
        messages,
        recentActivity,
        chartData,
      });
    } catch (error) {
      handleError(error, "fetch all dashboard data");
    } finally {
      setLoading(false);
    }
  }, [getMetrics, getTasks, getProjects, getMessages, getRecentActivity, getChartData]);

  // Load initial data on mount
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  return {
    // State
    metrics: state.metrics,
    tasks: state.tasks,
    projects: state.projects,
    messages: state.messages,
    recentActivity: state.recentActivity,
    chartData: state.chartData,

    // Actions
    loading,
    error,
    refreshMetrics,
    refreshTasks,
    refreshProjects,
    refreshMessages,
    refreshRecentActivity,
    refreshChartData,
    refreshAllData,
  };
};

// export default useDashboardData;
