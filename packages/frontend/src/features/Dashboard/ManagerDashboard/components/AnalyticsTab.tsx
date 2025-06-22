import { Bar, Line } from "react-chartjs-2";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiDollarSign,
  FiStar,
  FiTarget,
  FiTrendingDown,
  FiTrendingUp,
} from "react-icons/fi";
import { ManagerMetrics } from "../hooks/useManagerMetrics";
import { TeamMember } from "../hooks/useTeamMembers";

interface AnalyticsTabProps {
  metrics: ManagerMetrics;
  teamMembers: TeamMember[];
  teamProductivityData: any;
  projectProgressData: any;
}

export function AnalyticsTab({ metrics, teamMembers, teamProductivityData, projectProgressData }: AnalyticsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Team Productivity</h3>
            <div className="h-64">
              <Bar
                data={teamProductivityData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, max: 100 },
                  },
                  plugins: { legend: { position: "top" } },
                }}
              />
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Project Progress Trend</h3>
            <div className="h-64">
              <Line
                data={projectProgressData}
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
            <FiTrendingUp className="h-8 w-8" />
          </div>
          <div className="stat-title">Team Efficiency</div>
          <div className="stat-value text-primary">{metrics.teamProductivity}%</div>
          <div className="stat-desc">+8% from last month</div>
        </div>

        <div className="stat bg-base-100 shadow-sm rounded-box">
          <div className="stat-figure text-secondary">
            <FiTarget className="h-8 w-8" />
          </div>
          <div className="stat-title">On-Time Delivery</div>
          <div className="stat-value text-secondary">94%</div>
          <div className="stat-desc">Above target of 90%</div>
        </div>

        <div className="stat bg-base-100 shadow-sm rounded-box">
          <div className="stat-figure text-accent">
            <FiDollarSign className="h-8 w-8" />
          </div>
          <div className="stat-title">Budget Efficiency</div>
          <div className="stat-value text-accent">{metrics.budgetUtilization}%</div>
          <div className="stat-desc">Within allocated budget</div>
        </div>

        <div className="stat bg-base-100 shadow-sm rounded-box">
          <div className="stat-figure text-success">
            <FiStar className="h-8 w-8" />
          </div>
          <div className="stat-title">Quality Score</div>
          <div className="stat-value text-success">4.8</div>
          <div className="stat-desc">Based on code reviews</div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Top Performers</h4>
              <div className="space-y-2">
                {teamMembers
                  .sort((a, b) => b.productivity - a.productivity)
                  .slice(0, 3)
                  .map((member, index) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg bg-base-200/50">
                      <div
                        className={`badge ${
                          index === 0 ? "badge-warning" : index === 1 ? "badge-neutral" : "badge-accent"
                        }`}
                      >
                        #{index + 1}
                      </div>
                      <div className="avatar placeholder">
                        <div className="bg-primary text-primary-content rounded-full w-8 h-8">
                          <span className="text-xs">{member.avatar}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{member.name}</p>
                        <p className="text-xs text-base-content/70">{member.productivity}% productivity</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Areas for Improvement</h4>
              <div className="space-y-2">
                <div className="alert alert-warning py-2">
                  <FiAlertCircle className="h-4 w-4" />
                  <span className="text-sm">High workload detected for 2 team members</span>
                </div>
                <div className="alert alert-info py-2">
                  <FiTrendingDown className="h-4 w-4" />
                  <span className="text-sm">Task completion rate decreased by 5%</span>
                </div>
                <div className="alert alert-success py-2">
                  <FiCheckCircle className="h-4 w-4" />
                  <span className="text-sm">Code quality improved by 12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
