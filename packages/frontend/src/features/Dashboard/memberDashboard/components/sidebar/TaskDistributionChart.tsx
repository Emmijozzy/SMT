/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Chart, ChartData } from "chart.js";
import { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { FiPieChart } from "react-icons/fi";

interface TaskDistributionChartProps {
  data: unknown;
}

export function TaskDistributionChart({ data }: TaskDistributionChartProps) {
  const chartRef = useRef<Chart<"doughnut">>(null);

  useEffect(
    () => () => {
      if (chartRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        chartRef.current.destroy();
      }
    },
    [],
  );

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiPieChart className="h-5 w-5 mr-2" />
          Task Distribution
        </h3>
        <div className="h-48">
          <Doughnut
            ref={chartRef}
            data={data as ChartData<"doughnut">}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "bottom" as const,
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
  );
}
