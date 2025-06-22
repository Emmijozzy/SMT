import { Doughnut } from "react-chartjs-2";
import { FiPieChart } from "react-icons/fi";

interface TaskStatusChartProps {
  taskStatusData: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[];
  };
}

export function TaskStatusChart({ taskStatusData }: TaskStatusChartProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-lg mb-4 flex items-center">
          <FiPieChart className="h-5 w-5 mr-2" />
          Task Overview
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
  );
}
