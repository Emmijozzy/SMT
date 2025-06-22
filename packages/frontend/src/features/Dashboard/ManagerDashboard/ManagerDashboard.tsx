import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import Section from "../../../shared/components/Section";
import { AnalyticsTab } from "./components/AnalyticsTab";
import { DashboardHeader } from "./components/DashboardHeader";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { MetricsGrid } from "./components/MetricsGrid";
import { OverviewTab } from "./components/OverviewTab";
import { PendingSubtaskReview } from "./components/PendingSubtaskReview";
import { Sidebar } from "./components/Sidebar";
import { TabNavigation } from "./components/TabNavigation";
import { TasksTab } from "./components/TasksTab";
import { TeamTab } from "./components/TeamTab";
import { useChartData } from "./hooks/useChartData";
import { useDashboardFilters } from "./hooks/useDashboardFilters";
import { useManagerActivity } from "./hooks/useManagerActivity";
import { useManagerMetrics } from "./hooks/useManagerMetrics";
import { useManagerProjects } from "./hooks/useManagerProjects";
import { useManagerTasks } from "./hooks/useManagerTasks";
import { useTeamMembers } from "./hooks/useTeamMembers";

// Register ChartJS components
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
);

function ManagerDashboard() {
  // Custom hooks
  const { metrics, loading: metricsLoading, error: metricsError } = useManagerMetrics();
  const { teamMembers, updateMemberStatus } = useTeamMembers();
  const { tasks, createTask, updateTask, deleteTask } = useManagerTasks();
  const { projects, createProject, updateProject } = useManagerProjects();
  const { activities } = useManagerActivity();
  const { activeTab, timeFilter, searchTerm, handleTabChange, handleTimeFilterChange, handleSearchChange } =
    useDashboardFilters();

  // Chart data
  const { taskStatusData, teamProductivityData, projectProgressData, weeklyMetricsData } = useChartData(
    metrics,
    teamMembers,
    projects,
  );

  // Action handlers
  const handleCreateTask = () => {
    console.log("Create task clicked");
    // TODO: Open create task modal
  };

  const handleAddTeamMember = () => {
    console.log("Add team member clicked");
    // TODO: Open add team member modal
  };

  const handleScheduleMeeting = () => {
    console.log("Schedule meeting clicked");
    // TODO: Open schedule meeting modal
  };

  const handleGenerateReport = () => {
    console.log("Generate report clicked");
    // TODO: Generate and download report
  };

  const handleCreateProject = () => {
    console.log("Create project clicked");
    // TODO: Open create project modal
  };

  if (metricsLoading) {
    return (
      <Section>
        <div className="min-h-screen bg-base-200 p-4 lg:p-6 flex items-center justify-center">
          <div className="loading loading-spinner loading-lg" />
        </div>
      </Section>
    );
  }

  if (metricsError) {
    return (
      <Section>
        <div className="min-h-screen bg-base-200 p-4 lg:p-6 flex items-center justify-center">
          <div className="alert alert-error">
            <span>Error loading dashboard: {metricsError}</span>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="min-h-screen bg-base-200 p-4 lg:p-6">
        {/* Header */}
        <DashboardHeader
          timeFilter={timeFilter}
          searchTerm={searchTerm}
          onTimeFilterChange={handleTimeFilterChange}
          onSearchChange={handleSearchChange}
        />

        {/* Metrics Grid */}
        <MetricsGrid metrics={metrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Tap Section */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-0">
                <TabNavigation
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  teamMembersCount={teamMembers.length}
                  tasksCount={tasks.length}
                  projectsCount={projects.length}
                />

                <div className="p-6">
                  {activeTab === "overview" && (
                    <OverviewTab
                      metrics={metrics}
                      taskStatusData={taskStatusData}
                      weeklyMetricsData={weeklyMetricsData}
                    />
                  )}

                  {activeTab === "team" && (
                    <TeamTab teamMembers={teamMembers} onUpdateMemberStatus={updateMemberStatus} />
                  )}

                  {/* {activeTab === "tasks" && (
                    <SubtasksTab
                      tasks={tasks}
                      onCreateTask={handleCreateTask}
                      onUpdateTask={updateTask}
                      onDeleteTask={deleteTask}
                    />
                  )} */}

                  {/* {activeTab === "projects" && (
                    <TasksTab tasks={projects} onCreateProject={handleCreateProject} onUpdateProject={updateProject} />
                  )} */}

                  {activeTab === "analytics" && (
                    <AnalyticsTab
                      metrics={metrics}
                      teamMembers={teamMembers}
                      teamProductivityData={teamProductivityData}
                      projectProgressData={projectProgressData}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Penidng Review Subtasks */}
            <PendingSubtaskReview tasks={tasks} />
          </div>

          {/* Right Column - Sidebar */}
          <Sidebar
            metrics={metrics}
            teamMembers={teamMembers}
            tasks={tasks}
            projects={projects}
            activities={activities}
            taskStatusData={taskStatusData}
          />
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton
          onCreateTask={handleCreateTask}
          onAddTeamMember={handleAddTeamMember}
          onScheduleMeeting={handleScheduleMeeting}
          onGenerateReport={handleGenerateReport}
        />
      </div>
    </Section>
  );
}

export default ManagerDashboard;
