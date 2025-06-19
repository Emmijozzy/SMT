/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import { ProductivityData, WeeklyActivityData } from "../interfaces/DashboardInterfaces";

interface AnalyticsChartsProps {
  weeklyActivityData: WeeklyActivityData;
  productivityData: ProductivityData;
}

export function AnalyticsCharts({ weeklyActivityData, productivityData }: AnalyticsChartsProps) {
  const barChartRef = useRef<any>(null);
  const lineChartRef = useRef<any>(null);

  useEffect(
    () => () => {
      if (barChartRef.current) {
        barChartRef?.current?.destroy();
      }
      if (lineChartRef.current) {
        lineChartRef?.current?.destroy();
      }
    },
    [],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="card-title text-lg mb-4">Weekly Activity</h3>
          <div className="h-64">
            <Bar
              ref={barChartRef}
              data={weeklyActivityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  intersect: false,
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true, grid: { display: true } },
                },
                plugins: { legend: { position: "top" as const } },
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
              ref={lineChartRef}
              data={productivityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  intersect: false,
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { beginAtZero: true, max: 100 },
                },
                plugins: { legend: { display: false } },
                elements: {
                  point: {
                    radius: 4,
                    hoverRadius: 6,
                  },
                  line: {
                    tension: 0.4,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
