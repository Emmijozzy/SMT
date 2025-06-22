import { FiAlertCircle, FiCheckCircle, FiClock, FiEye, FiTarget, FiTrendingUp, FiUsers } from "react-icons/fi";
import { ManagerMetrics } from "../hooks/useManagerMetrics";
import { MetricCard } from "./MetricCard";

interface MetricsGridProps {
  metrics: ManagerMetrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
      <MetricCard
        icon={<FiCheckCircle className="text-success" />}
        title="Subtask Completed"
        value={metrics.completedSubtasks}
        subtitle={`${metrics.completionRate}% rate`}
        trend={metrics.completedSubtasksTrend || ""}
        color="success"
      />
      <MetricCard
        icon={<FiClock className="text-info" />}
        title="Subtask In Progress"
        value={metrics.inProgressSubtasks}
        subtitle="Active subtasksa"
        trend={metrics.inProgressSubtasksTrend || ""}
        color="info"
      />
      <MetricCard
        icon={<FiAlertCircle className="text-warning" />}
        title="Subtask Overdue"
        value={metrics.overdueSubtasks}
        subtitle="Need attention"
        trend={metrics.overdueSubtasksTrend || ""}
        color="warning"
      />
      <MetricCard
        icon={<FiUsers className="text-primary" />}
        title="Team Size"
        value={metrics.teamSize}
        subtitle="Active members"
        trend={metrics.teamSizeTrend || ""}
        color="primary"
      />
      <MetricCard
        icon={<FiTrendingUp className="text-secondary" />}
        title="Productivity"
        value={`${metrics.teamProductivity}%`}
        subtitle="Team average"
        trend={metrics.teamProductivityTrend || ""}
        color="secondary"
      />
      <MetricCard
        icon={<FiTarget className="text-accent" />}
        title="Tasks"
        value={metrics.activeTasks}
        subtitle="Active Tasks"
        trend={metrics.activeTasksTrend || ""}
        color="accent"
      />
      <MetricCard
        icon={<FiEye className="text-purple-500" />}
        title="In Review"
        value={metrics.inReviewSubtasks}
        subtitle="Pending Review"
        trend={metrics.inReviewSubtasksTrend || ""}
        color="purple"
      />
    </div>
  );
}
