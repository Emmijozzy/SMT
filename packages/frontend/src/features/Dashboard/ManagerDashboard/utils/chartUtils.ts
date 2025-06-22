export const getStatusColor = (status: string): string => {
  const colors = {
    completed: "#10B981",
    "in-progress": "#3B82F6",
    pending: "#F59E0B",
    overdue: "#EF4444",
    active: "#10B981",
    planning: "#F59E0B",
    "on-hold": "#6B7280",
  };

  return colors[status as keyof typeof colors] || "#6B7280";
};

export const getPriorityColor = (priority: string): string => {
  const colors = {
    critical: "#EF4444",
    high: "#F59E0B",
    medium: "#3B82F6",
    low: "#10B981",
  };

  return colors[priority as keyof typeof colors] || "#6B7280";
};

export const getWorkloadColor = (workload: number): string => {
  if (workload > 90) return "#EF4444"; // error
  if (workload > 75) return "#F59E0B"; // warning
  return "#10B981"; // success
};

export const getProductivityColor = (productivity: number): string => {
  if (productivity >= 90) return "#10B981"; // success
  if (productivity >= 75) return "#3B82F6"; // info
  if (productivity >= 60) return "#F59E0B"; // warning
  return "#EF4444"; // error
};
