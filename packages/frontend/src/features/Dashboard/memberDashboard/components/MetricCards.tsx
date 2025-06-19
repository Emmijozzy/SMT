import { FiAlertCircle, FiCheckCircle, FiClock, FiTarget, FiTrendingUp, FiXCircle } from "react-icons/fi";
import { MetricsData } from "../interfaces/DashboardInterfaces";
import { MetricCard } from "./MetricCard";

type MetricCardProps = {
  metrics: MetricsData;
};

function MetricCards({ metrics }: MetricCardProps) {
  return (
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
        icon={<FiXCircle className="text-error" />}
        title="Rejected"
        value={`${metrics.rejectedTasks}`}
        subtitle="Tasks rejected"
        trend="-2%"
        color="error"
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
    </div>
  );
}

export default MetricCards;
