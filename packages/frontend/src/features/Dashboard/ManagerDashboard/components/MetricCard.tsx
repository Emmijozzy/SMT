/* eslint-disable no-nested-ternary */
import { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  trend: string;
  color: string;
}

const colorClasses = {
  success: "text-success",
  info: "text-info",
  warning: "text-warning",
  error: "text-error",
  primary: "text-primary",
  secondary: "text-secondary",
  accent: "text-accent",
} as const;

export function MetricCard({ icon, title, value, subtitle, trend, color }: MetricCardProps) {
  const isPositiveTrend = trend.startsWith("+") || trend.includes("new") || trend.includes("faster");

  return (
    <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <div className={`p-2 rounded-lg bg-base-200 ${colorClasses[color as keyof typeof colorClasses]}`}>{icon}</div>
          <div
            className={`text-xs font-medium ${
              isPositiveTrend
                ? "text-success"
                : trend.includes("-") || trend.includes("overdue")
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
