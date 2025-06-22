/* eslint-disable no-nested-ternary */
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  DoughnutController,
} from "chart.js";
import { useState, ReactNode, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  FiAlertCircle,
  FiBarChart2,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiList,
  FiMessageSquare,
  FiUser,
  FiTrendingUp,
  FiTarget,
  FiAward,
  FiBell,
  FiSettings,
  FiSearch,
  FiFilter,
  FiDownload,
  FiEye,
  FiEdit,
  FiMoreVertical,
  FiPlay,
  FiPause,
  FiRefreshCw,
  FiStar,
  FiUsers,
  FiActivity,
  FiPieChart,
} from "react-icons/fi";
import Section from "../../../shared/components/Section";

// Register ChartJS components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend, DoughnutController);

function TeamMemberDashboard() {
  const [activeTab, setActiveTab] = useState<"tasks" | "projects" | "messages" | "analytics">("tasks");
  const [timeFilter, setTimeFilter] = useState<"today" | "week" | "month">("week");
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced sample data
  const metrics = {
    totalTasks: 24,
    completedTasks: 18,
    inProgressTasks: 4,
    overdueTasks: 2,
    productivity: 87,
    upcomingDeadlines: 5,
    hoursWorked: 32,
    weeklyGoal: 40,
    completionRate: 75,
    averageTaskTime: 2.5,
    streakDays: 7,
    teamRanking: 3,
  };

  const tasks = [
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
  ];

  const projects = [
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
  ];

  const messages = [
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
  ];

  const recentActivity = [
    { id: 1, action: "Completed task", item: "User authentication", time: "2 hours ago", type: "success" },
    { id: 2, action: "Started working on", item: "API documentation", time: "4 hours ago", type: "info" },
    { id: 3, action: "Commented on", item: "Pull request #142", time: "6 hours ago", type: "info" },
    { id: 4, action: "Submitted for review", item: "Login page fixes", time: "1 day ago", type: "warning" },
  ];

  // Enhanced chart data
  const taskStatusData = {
    labels: ["Completed", "In Progress", "Pending", "Overdue"],
    datasets: [
      {
        data: [18, 4, 2, 2],
        backgroundColor: [
          "#10B981", // green
          "#3B82F6", // blue
          "#F59E0B", // amber
          "#EF4444", // red
        ],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const weeklyActivityData = {
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
  };

  const productivityData = {
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
  };

  return (
    <Section>
      <div className="min-h-screen bg-base-200 p-4 lg:p-6">
        {/* Enhanced Header */}
        <div className="navbar bg-base-100 rounded-box shadow-sm mb-6">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl lg:text-3xl font-bold">My Dashboard</h1>
              <p className="text-sm text-base-content/70">Welcome back! Here's your progress overview</p>
            </div>
          </div>

          <div className="navbar-end gap-2">
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered input-sm w-24 lg:w-auto"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square btn-sm">
                  <FiSearch />
                </button>
              </div>
            </div>

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <FiBell className="h-5 w-5" />
                  <span className="badge badge-xs badge-primary indicator-item">3</span>
                </div>
              </div>
              <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-base-100">
                <div className="card-body">
                  <h3 className="font-bold">Notifications</h3>
                  <div className="space-y-2">
                    <div className="alert alert-info py-2">
                      <FiCheckCircle className="h-4 w-4" />
                      <span className="text-xs">Task completed successfully</span>
                    </div>
                    <div className="alert alert-warning py-2">
                      <FiClock className="h-4 w-4" />
                      <span className="text-xs">Deadline approaching</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-ghost btn-circle">
              <FiSettings className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Time Filter Tabs */}
        <div className="tabs tabs-boxed bg-base-100 mb-6 w-fit">
          {(["today", "week", "month"] as const).map((filter) => (
            <button
              key={filter}
              className={`tab ${timeFilter === filter ? "tab-active" : ""}`}
              onClick={() => setTimeFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>

        {/* Enhanced Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
          <MetricCard
            icon={<FiCheckCircle className="text-success" />}
            title="Completed"
            value={metrics.completedTasks}
            subtitle={`${metrics.completionRate}% rate`}
            trend="+12%"
            color="success"
          />
          <MetricCard
            icon={<FiClock className="text-info" />}
            title="In Progress"
            value={metrics.inProgressTasks}
            subtitle="Active tasks"
            trend="+2"
            color="info"
          />
          <MetricCard
            icon={<FiAlertCircle className="text-warning" />}
            title="Overdue"
            value={metrics.overdueTasks}
            subtitle="Need attention"
            trend="-1"
            color="warning"
          />
          <MetricCard
            icon={<FiTrendingUp className="text-primary" />}
            title="Productivity"
            value={`${metrics.productivity}%`}
            subtitle="This week"
            trend="+5%"
            color="primary"
          />
          <MetricCard
            icon={<FiTarget className="text-secondary" />}
            title="Hours"
            value={`${metrics.hoursWorked}/${metrics.weeklyGoal}`}
            subtitle="Weekly goal"
            trend="80%"
            color="secondary"
          />
          <MetricCard
            icon={<FiAward className="text-accent" />}
            title="Streak"
            value={`${metrics.streakDays} days`}
            subtitle="Current streak"
            trend="🔥"
            color="accent"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-6">
            {/* Enhanced Tabs */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body p-0">
                <div className="tabs tabs-lifted">
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className={`tab tab-lg ${activeTab === "tasks" ? "tab-active" : ""}`}
                  >
                    <FiList className="mr-2" />
                    My Tasks
                    <div className="badge badge-sm ml-2">{tasks.length}</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className={`tab tab-lg ${activeTab === "projects" ? "tab-active" : ""}`}
                  >
                    <FiCalendar className="mr-2" />
                    Projects
                    <div className="badge badge-sm ml-2">{projects.length}</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("messages")}
                    className={`tab tab-lg ${activeTab === "messages" ? "tab-active" : ""}`}
                  >
                    <FiMessageSquare className="mr-2" />
                    Messages
                    <div className="badge badge-sm badge-primary ml-2">{messages.filter((m) => m.unread).length}</div>
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className={`tab tab-lg ${activeTab === "analytics" ? "tab-active" : ""}`}
                  >
                    <FiBarChart2 className="mr-2" />
                    Analytics
                  </button>
                </div>

                <div className="p-6">
                  {/* Enhanced Tasks Tab */}
                  {activeTab === "tasks" && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                        <div className="flex gap-2">
                          <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
                              <FiFilter className="h-4 w-4" />
                              Filter
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                              <li>
                                <a>All Tasks</a>
                              </li>
                              <li>
                                <a>High Priority</a>
                              </li>
                              <li>
                                <a>Due Today</a>
                              </li>
                              <li>
                                <a>Overdue</a>
                              </li>
                            </ul>
                          </div>
                          <button className="btn btn-outline btn-sm">
                            <FiDownload className="h-4 w-4" />
                            Export
                          </button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {tasks.map((task) => (
                          <div
                            key={task.id}
                            className="card bg-base-100 border hover:shadow-md transition-all duration-200"
                          >
                            <div className="card-body p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-semibold text-base">{task.title}</h3>
                                    <div
                                      className={`badge badge-sm ${
                                        task.priority === "critical"
                                          ? "badge-error" :
                                        task.priority === "high" ? "badge-warning" :
                                          task.priority === "medium" ? "badge-info" : "badge-neutral"
                                      }`}
                                    >
                                      {task.priority}
                                    </div>
                                  </div>

                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {task.tags.map((tag, index) => (
                                      <span key={index} className="badge badge-outline badge-xs">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-base-content/70">
                                    <div>
                                      <span className="font-medium">Project:</span> {task.project}
                                    </div>
                                    <div>
                                      <span className="font-medium">Due:</span> {new Date(task.due).toLocaleDateString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Assigned by:</span> {task.assignedBy}
                                    </div>
                                  </div>

                                  {task.progress > 0 && (
                                    <div className="mt-3">
                                      <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span>{task.progress}%</span>
                                      </div>
                                      <progress
                                        className="progress progress-primary w-full"
                                        value={task.progress}
                                        max="100"
                                      ></progress>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-2 ml-4">
                                  <div
                                    className={`badge ${
                                      task.status === "completed"
                                        ? "badge-success" :
                                      task.status === "in-progress" ? "badge-info" :
                                        task.status === "overdue" ? "badge-error" : "badge-neutral"
                                    }`}
                                  >
                                    {task.status.replace("-", " ")}
                                  </div>

                                  <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-circle">
                                      <FiMoreVertical className="h-4 w-4" />
                                    </div>
                                    <ul
                                      tabIndex={0}
                                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
                                    >
                                      <li>
                                        <a>
                                          <FiEye className="h-4 w-4" />
                                          View
                                        </a>
                                      </li>
                                      <li>
                                        <a>
                                          <FiEdit className="h-4 w-4" />
                                          Edit
                                        </a>
                                      </li>
                                      <li>
                                        <a>
                                          <FiPlay className="h-4 w-4" />
                                          Start
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Projects Tab */}
                  {activeTab === "projects" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="card bg-gradient-to-br from-base-100 to-base-200 shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <div className="card-body">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="card-title text-lg">{project.name}</h3>
                                <p className="text-sm text-base-content/70">{project.role}</p>
                              </div>
                              <div
                                className={`badge ${
                                  project.status === "active"
                                    ? "badge-success" :
                                  project.status === "planning" ? "badge-warning" : "badge-neutral"
                                }`}
                              >
                                {project.status}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-2">
                                  <span>Progress</span>
                                  <span className="font-semibold">{project.progress}%</span>
                                </div>
                                <progress
                                  className={`progress w-full ${
                                    project.progress > 75
                                      ? "progress-success" :
                                      project.progress > 50 ? "progress-info" :
                                        project.progress > 25 ? "progress-warning" : "progress-error"
                                  }`}
                                  value={project.progress}
                                  max="100"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="stat bg-base-200/50 rounded-lg p-3">
                                  <div className="stat-title text-xs">Tasks</div>
                                  <div className="stat-value text-lg">
                                    {project.tasksCompleted}/{project.totalTasks}
                                  </div>
                                </div>
                                <div className="stat bg-base-200/50 rounded-lg p-3">
                                  <div className="stat-title text-xs">Team Size</div>
                                  <div className="stat-value text-lg flex items-center">
                                    <FiUsers className="h-4 w-4 mr-1" />
                                    {project.teamSize}
                                  </div>
                                </div>
                              </div>

                              <div className="flex justify-between items-center pt-2 border-t border-base-300">
                                <div className="text-sm">
                                  <span className="text-base-content/70">Deadline:</span>
                                  <span className="font-medium ml-1">
                                    {new Date(project.deadline).toLocaleDateString()}
                                  </span>
                                </div>
                                <div
                                  className={`badge badge-sm ${
                                    project.priority === "high"
                                      ? "badge-error" :
                                    project.priority === "medium" ? "badge-warning" : "badge-info"
                                  }`}
                                >
                                  {project.priority} priority
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Enhanced Messages Tab */}
                  {activeTab === "messages" && (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`card ${message.unread ? "bg-primary/5 border-primary/20" : "bg-base-100"} shadow-sm`}
                        >
                          <div className="card-body p-4">
                            <div className="flex items-start gap-4">
                              <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content rounded-full w-10 h-10">
                                  <span className="text-sm">{message.avatar}</span>
                                </div>
                              </div>

                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-semibold">{message.sender}</h4>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-base-content/70">{message.time}</span>
                                      <div
                                        className={`badge badge-xs ${
                                          message.type === "request"
                                            ? "badge-warning" :
                                          message.type === "update" ? "badge-info" : "badge-success"
                                        }`}
                                      >
                                        {message.type}
                                      </div>
                                    </div>
                                  </div>
                                  {message.unread && <div className="badge badge-primary badge-xs">New</div>}
                                </div>

                                <p className="text-sm text-base-content/80 mb-3">{message.content}</p>

                                <div className="flex gap-2">
                                  <button className="btn btn-outline btn-xs">Reply</button>
                                  {message.unread && <button className="btn btn-ghost btn-xs">Mark as read</button>}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Analytics Tab */}
                  {activeTab === "analytics" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="card bg-base-100 shadow-sm">
                          <div className="card-body">
                            <h3 className="card-title text-lg mb-4">Weekly Activity</h3>
                            <div className="h-64">
                              <Bar
                                data={weeklyActivityData}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  scales: {
                                    x: { grid: { display: false } },
                                    y: { beginAtZero: true, grid: { drawBorder: false } },
                                  },
                                  plugins: { legend: { position: "top" } },
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="card bg-base-100 shadow-sm">
                          <div className="card-body">
                            <h3 className="card-title text-lg mb-4">Productivity Trend</h3>
                            <div className="h-64">
                              <Line
                                data={productivityData}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  scales: {
                                    x: { grid: { display: false } },
                                    y: { beginAtZero: true, max: 100 },
                                  },
                                  plugins: { legend: { display: false } },
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="stat bg-base-100 shadow-sm rounded-box">
                          <div className="stat-figure text-primary">
                            <FiTarget className="h-8 w-8" />
                          </div>
                          <div className="stat-title">Avg. Task Time</div>
                          <div className="stat-value text-primary">{metrics.averageTaskTime}h</div>
                          <div className="stat-desc">Per task completion</div>
                        </div>

                        <div className="stat bg-base-100 shadow-sm rounded-box">
                          <div className="stat-figure text-secondary">
                            <FiAward className="h-8 w-8" />
                          </div>
                          <div className="stat-title">Team Ranking</div>
                          <div className="stat-value text-secondary">#{metrics.teamRanking}</div>
                          <div className="stat-desc">Out of 12 members</div>
                        </div>

                        <div className="stat bg-base-100 shadow-sm rounded-box">
                          <div className="stat-figure text-accent">
                            <FiActivity className="h-8 w-8" />
                          </div>
                          <div className="stat-title">Completion Rate</div>
                          <div className="stat-value text-accent">{metrics.completionRate}%</div>
                          <div className="stat-desc">This month</div>
                        </div>

                        <div className="stat bg-base-100 shadow-sm rounded-box">
                          <div className="stat-figure text-success">
                            <FiStar className="h-8 w-8" />
                          </div>
                          <div className="stat-title">Quality Score</div>
                          <div className="stat-value text-success">4.8</div>
                          <div className="stat-desc">Based on reviews</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Task Status Chart */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4 flex items-center">
                  <FiPieChart className="h-5 w-5 mr-2" />
                  Task Distribution
                </h3>
                <div className="h-48">
                  <Doughnut
                    data={taskStatusData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "bottom",
                          labels: {
                            usePointStyle: true,
                            padding: 16,
                            font: { size: 12 },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button className="btn btn-primary btn-sm w-full justify-start">
                    <FiPlay className="h-4 w-4" />
                    Start New Task
                  </button>
                  <button className="btn btn-outline btn-sm w-full justify-start">
                    <FiRefreshCw className="h-4 w-4" />
                    Sync Tasks
                  </button>
                  <button className="btn btn-outline btn-sm w-full justify-start">
                    <FiCalendar className="h-4 w-4" />
                    View Calendar
                  </button>
                  <button className="btn btn-outline btn-sm w-full justify-start">
                    <FiDownload className="h-4 w-4" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4 flex items-center">
                  <FiActivity className="h-5 w-5 mr-2" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          activity.type === "success"
                            ? "bg-success" :
                          activity.type === "warning" ? "bg-warning" : "bg-info"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="text-primary">{activity.item}</span>
                        </p>
                        <p className="text-xs text-base-content/70">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider my-2" />
                <button className="btn btn-ghost btn-sm w-full">View All Activity</button>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4 flex items-center">
                  <FiClock className="h-5 w-5 mr-2" />
                  Upcoming Deadlines
                </h3>
                <div className="space-y-3">
                  {tasks
                    .filter((task) => task.status !== "completed")
                    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
                    .slice(0, 4)
                    .map((task) => {
                      const daysUntilDue = Math.ceil(
                        (new Date(task.due).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                      );
                      const isOverdue = daysUntilDue < 0;
                      const isUrgent = daysUntilDue <= 1 && daysUntilDue >= 0;

                      return (
                        <div key={task.id} className="flex items-start gap-3">
                          <div
                            className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                              isOverdue ? "bg-error" : isUrgent ? "bg-warning" : "bg-info"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{task.title}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-base-content/70">{task.project}</p>
                              <span
                                className={`text-xs font-medium ${
                                  isOverdue ? "text-error" : isUrgent ? "text-warning" : "text-info"
                                }`}
                              >
                                {isOverdue
                                  ? `${Math.abs(daysUntilDue)} days overdue` :
                                  isUrgent ? "Due soon" : `${daysUntilDue} days left`}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <div className="divider my-2" />
                <button className="btn btn-ghost btn-sm w-full">View All Deadlines</button>
              </div>
            </div>

            {/* Team Performance */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4 flex items-center">
                  <FiUsers className="h-5 w-5 mr-2" />
                  Team Leaderboard
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "Sarah Johnson", score: 95, rank: 1, avatar: "SJ" },
                    { name: "Mike Chen", score: 89, rank: 2, avatar: "MC" },
                    { name: "You", score: 87, rank: 3, avatar: "ME", isCurrentUser: true },
                    { name: "Alex Wilson", score: 82, rank: 4, avatar: "AW" },
                  ].map((member) => (
                    <div
                      key={member.rank}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        member.isCurrentUser ? "bg-primary/10 border border-primary/20" : ""
                      }`}
                    >
                      <div
                        className={`badge badge-sm ${
                          member.rank === 1
                            ? "badge-warning"
                            : member.rank === 2
                            ? "badge-neutral"
                            : member.rank === 3
                            ? "badge-accent"
                            : "badge-ghost"
                        }`}
                      >
                        #{member.rank}
                      </div>
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
                          <span className="text-xs">{member.avatar}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${member.isCurrentUser ? "text-primary" : ""}`}>
                          {member.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <progress
                            className="progress progress-primary progress-xs w-16"
                            value={member.score}
                            max="100"
                          />
                          <span className="text-xs text-base-content/70">{member.score}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Goals & Achievements */}
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body">
                <h3 className="card-title text-lg mb-4 flex items-center">
                  <FiTarget className="h-5 w-5 mr-2" />
                  Goals & Achievements
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Task Goal</span>
                      <span className="font-medium">18/20</span>
                    </div>
                    <progress className="progress progress-success w-full" value="90" max="100" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality Score</span>
                      <span className="font-medium">4.8/5.0</span>
                    </div>
                    <progress className="progress progress-info w-full" value="96" max="100" />
                  </div>

                  <div className="divider my-2" />

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Recent Badges</h4>
                    <div className="flex gap-2">
                      <div className="tooltip" data-tip="Completed 10 tasks in a row">
                        <div className="badge badge-warning">🔥 Streak Master</div>
                      </div>
                      <div className="tooltip" data-tip="Finished all tasks before deadline">
                        <div className="badge badge-success">⚡ Speed Demon</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <div className="dropdown dropdown-top dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-primary btn-circle btn-lg shadow-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mb-2">
              <li>
                <a>
                  <FiList className="h-4 w-4" />
                  Create Task
                </a>
              </li>
              <li>
                <a>
                  <FiCalendar className="h-4 w-4" />
                  Schedule Meeting
                </a>
              </li>
              <li>
                <a>
                  <FiMessageSquare className="h-4 w-4" />
                  Send Message
                </a>
              </li>
              <li>
                <a>
                  <FiDownload className="h-4 w-4" />
                  Generate Report
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

// Enhanced MetricCard Component
type MetricCardProps = {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  trend: string;
  color: string;
};

function MetricCard({ icon, title, value, subtitle, trend, color }: MetricCardProps) {
  const colorClasses = {
    success: "text-success",
    info: "text-info",
    warning: "text-warning",
    error: "text-error",
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
  };

  const isPositiveTrend = trend.startsWith("+") || trend.includes("🔥");

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg bg-base-200 ${colorClasses[color as keyof typeof colorClasses]}`}>{icon}</div>
          <div
            className={`text-xs font-medium ${
              isPositiveTrend
                ? "text-success"
                : trend.includes("Need") || trend.includes("-")
                  ? "text-warning"
                  : "text-base-content/70"
            }`}
          >
            {trend}
          </div>
        </div>
        <div className="mt-3">
          <p className="text-xs text-base-content/70 font-medium uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className="text-xs text-base-content/60 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamMemberDashboard;
