/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Bar, Doughnut } from "react-chartjs-2";
import { FiAlertCircle, FiStar, FiTarget, FiZap } from "react-icons/fi";
import { ManagerMetrics } from "../hooks/useManagerMetrics";
import { ChartData } from "../type";

interface OverviewTabProps {
  metrics: ManagerMetrics;
  taskStatusData: ChartData;
  weeklyMetricsData: ChartData;
}

export function OverviewTab({ metrics, taskStatusData, weeklyMetricsData }: OverviewTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Task Distribution</h3>
            <div className="h-64">
              <Doughnut
                data={taskStatusData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "right",
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

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Weekly Metrics</h3>
            <div className="h-64">
              <Bar
                data={weeklyMetricsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true },
                  },
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Critical Tasks Alert */}
      <div className="alert alert-warning">
        <FiAlertCircle className="h-6 w-6" />
        <div>
          <h3 className="font-bold">Attention Required!</h3>
          <div className="text-xs">
            {metrics.criticalSubtasks} critical tasks and {metrics.overdueSubtasks} overdue tasks need immediate
            attention.
          </div>
        </div>
        <button type="button" className="btn btn-sm btn-outline">
          View Tasks
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="stat bg-base-100 shadow-sm rounded-box">
          <div className="stat-figure text-primary">
            <FiZap className="h-8 w-8" />
          </div>
          <div className="stat-title">Avg. Completion Time</div>
          <div className="stat-value text-primary">{metrics.avgCompletionTime} days</div>
          <div className="stat-desc">15% faster than last month</div>
        </div>

        <div className="stat bg-base-100 shadow-sm rounded-box">
          <div className="stat-figure text-secondary">
            <FiTarget className="h-8 w-8" />
          </div>
          <div className="stat-title">Team Utilization</div>
          <div className="stat-value text-secondary">{metrics.teamUtilization}%</div>
          <div className="stat-desc">Optimal range: 70-85%</div>
        </div>

        <div className="stat bg-base-100 shadow-sm rounded-box">
          <div className="stat-figure text-accent">
            <FiStar className="h-8 w-8" />
          </div>
          <div className="stat-title">Client Satisfaction</div>
          <div className="stat-value text-accent">{metrics.clientSatisfaction}/5.0</div>
          <div className="stat-desc">Based on recent feedback</div>
        </div>
      </div>
    </div>
  );
}
