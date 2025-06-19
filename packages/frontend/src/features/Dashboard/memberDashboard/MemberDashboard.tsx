import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useState } from "react";

import Section from "../../../shared/components/Section";
import MetricCards from "./components/MetricCards";
import { OverdueTasksCarousel } from "./components/OverdueTasksCarousel";
import { SidebarLayout } from "./components/sidebar/SidebarLayout";
import { TabSystem } from "./components/TabSystem";
import { useDashboardData } from "./hooks/useDashboardData";
import { useTabManagement } from "./hooks/useTabManagement";
import { DashboardActions } from "./interfaces/DashboardInterfaces";

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  LineElement,
  PointElement,
  Filler,
);

function TeamMemberDashboard() {
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("week");

  // Initialize services
  // const dataService = new DashboardDataService();

  // Load dashboard data
  const { metrics, tasks, projects, messages, recentActivity, chartData, loading, error, refreshAllData } =
    useDashboardData();

  // Manage tabs
  const { activeTab, tabConfigs, tabRenderers, handleTabChange } = useTabManagement({
    tasksCount: tasks.length,
    projectsCount: projects.length,
    unreadMessagesCount: messages.filter((m) => m.unread).length,
  });

  // Action handlers
  const dashboardActions: DashboardActions = {
    onTaskAction: (action: string, taskId: number) => {
      console.log(`Task action: ${action} on task ${taskId}`);
      // Implement task actions
    },
    onProjectAction: (action: string, projectId: number) => {
      console.log(`Project action: ${action} on project ${projectId}`);
      // Implement project actions
    },
    onMessageAction: (action: string, messageId: number) => {
      console.log(`Message action: ${action} on message ${messageId}`);
      // Implement message actions
    },
    onFilterChange: (filter: string) => {
      console.log(`Filter changed to: ${filter}`);
      // Implement filtering
    },
    onExport: () => {
      console.log("Export requested");
      // Implement export functionality
    },
  };

  if (loading) {
    return (
      <Section>
        <div className="min-h-screen bg-base-200 p-4 lg:p-6 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <div className="min-h-screen bg-base-200 p-4 lg:p-6 flex items-center justify-center">
          <div className="alert alert-error">
            <span>{error}</span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                refreshAllData().finally(() => window.location.reload());
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </Section>
    );
  }

  if (!metrics || !chartData) {
    return (
      <Section>
        <div className="min-h-screen bg-base-200 p-4 lg:p-6 flex items-center justify-center">
          <span className="loading loading-spinner loading-lg" />
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="min-h-screen bg-base-200 p-4 lg:p-6">
        {/* Header */}
        <div className="navbar flex-col md:flex-row justify-between bg-base-100 rounded-box shadow-sm mb-6 gap-3">
          <div className="flex-1">
            <div className="flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-bold md:hidden text-center">My Dashboard</h1>
              <p className="text-sm text-base-content/70 text-center md:text-left">
                Welcome back! Here's your progress overview
              </p>
            </div>
          </div>

          {/* Time Filter Tabs */}
          <div className="tabs tabs-boxed bg-base-100 w-fit">
            {(["today", "week", "month"] as const).map((filter) => (
              <button
                type="button"
                key={filter}
                className={`tab ${timeFilter === filter ? "tab-active" : ""}`}
                onClick={() => setTimeFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Grid */}
        <MetricCards metrics={metrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-6">
            <TabSystem tabs={tabConfigs} activeTab={activeTab} onTabChange={handleTabChange}>
              {/* Render active tab content */}
              {tabRenderers.tasks.render({
                isActive: activeTab === "tasks",
                data: { tasks },
                onAction: dashboardActions.onTaskAction,
              })}

              {tabRenderers.projects.render({
                isActive: activeTab === "projects",
                data: { projects },
                onAction: dashboardActions.onProjectAction,
              })}

              {tabRenderers.messages.render({
                isActive: activeTab === "messages",
                data: { messages },
                onAction: dashboardActions.onMessageAction,
              })}

              {tabRenderers.analytics.render({
                isActive: activeTab === "analytics",
                data: {
                  weeklyActivityData: chartData.weeklyActivityData,
                  productivityData: chartData.productivityData,
                  metrics,
                },
              })}
            </TabSystem>

            {/* Overdue task */}
            <OverdueTasksCarousel tasks={tasks} onTaskAction={dashboardActions.onTaskAction} />
          </div>

          {/* Right Column - Sidebar */}
          <SidebarLayout
            tasks={tasks}
            recentActivity={recentActivity}
            chartData={chartData}
            onTaskAction={(action: string, taskId: number) => dashboardActions?.onTaskAction?.(action, taskId)}
          />
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="dropdown dropdown-top dropdown-end">
            <div role="button" aria-label="float" className="btn btn-primary btn-circle btn-lg shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2">
              <li>
                <button type="button">Create Task</button>
              </li>
              <li>
                <button type="button">Schedule Meeting</button>
              </li>
              <li>
                <button type="button">Send Message</button>
              </li>
              <li>
                <button type="button" onClick={dashboardActions.onExport}>
                  Generate Report
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
export default TeamMemberDashboard;
