import { ReactNode } from "react";
import { FiDownload, FiFilter } from "react-icons/fi";
import { TabContentProps } from "../../types/TabTypes";
import { TaskCard } from "../TaskCard";
import { BaseTab } from "./BaseTab";
import { TaskData } from "../../interfaces/DashboardInterfaces";

export class TasksTab extends BaseTab {
  render({ isActive, data, onAction }: TabContentProps): ReactNode {
    if (!isActive) return null;

    const { tasks } = (data as { tasks: TaskData[] }) || {};

    if (!tasks || tasks.length === 0) {
      return this.renderEmptyState("No tasks available");
    }

    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2">
            <div className="dropdown">
              <button type="button" className="btn btn-outline btn-sm" aria-label="Filter tasks">
                <FiFilter className="h-4 w-4" />
                Filter
              </button>
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button type="button">All Tasks</button>
                </li>
                <li>
                  <button type="button">High Priority</button>
                </li>
                <li>
                  <button type="button">Due Today</button>
                </li>
                <li>
                  <button type="button">Overdue</button>
                </li>
              </ul>
            </div>
            <button type="button" className="btn btn-outline btn-sm">
              <FiDownload className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.map((task: TaskData) => (
            <TaskCard key={task.id} task={task} onAction={onAction} />
          ))}
        </div>
      </div>
    );
  }
}
