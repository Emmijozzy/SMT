/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { MouseEvent, useEffect, useRef, useState } from "react";
import { FiAlertTriangle, FiChevronLeft, FiChevronRight, FiClock, FiUser } from "react-icons/fi";
import { TaskData } from "../interfaces/DashboardInterfaces";

interface OverdueTasksCarouselProps {
  tasks: TaskData[];
  maxItems?: number;
  onTaskAction?: (action: string, taskId: number) => void;
}

export function OverdueTasksCarousel({ tasks, maxItems = 10, onTaskAction }: OverdueTasksCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const getOverdueInfo = (dueDate: string) => {
    const daysOverdue = Math.abs(
      Math.ceil((new Date().getTime() - new Date(dueDate).getTime()) / (1000 * 60 * 60 * 24)),
    );

    return {
      daysOverdue,
      overdueText: daysOverdue === 1 ? "1 day overdue" : `${daysOverdue} days overdue`,
      urgencyLevel: daysOverdue > 7 ? "critical" : daysOverdue > 3 ? "high" : "medium",
    };
  };

  const overdueTasks = tasks
    .filter((task) => {
      const isOverdue = new Date(task.due).getTime() < new Date().getTime();
      return isOverdue && task.status !== "completed";
    })
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()) // Oldest overdue first
    .slice(0, maxItems);

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case "critical":
        return "bg-error";
      case "high":
        return "bg-warning";
      default:
        return "bg-orange-500";
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case "critical":
        return "badge-error";
      case "high":
        return "badge-warning";
      case "medium":
        return "badge-info";
      default:
        return "badge-neutral";
    }
  };

  const handleTaskClick = (taskId: number) => {
    onTaskAction?.("view", taskId);
  };

  const handleStartTask = (e: MouseEvent, taskId: number) => {
    e.stopPropagation();
    onTaskAction?.("start", taskId);
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate width of each card
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // Approximate width of each card
      scrollContainerRef.current.scrollBy({
        left: cardWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [overdueTasks]);

  return (
    <div className="card bg-base-100 shadow-sm border-l-4 border-l-error">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-lg flex items-center text-error">
            <FiAlertTriangle className="h-5 w-5 mr-2" />
            Overdue Tasks
            {overdueTasks.length > 0 && <div className="badge badge-error badge-sm ml-2">{overdueTasks.length}</div>}
          </h3>

          {overdueTasks.length > 0 && (
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="scroll left tasks"
                className={`btn btn-circle btn-sm ${canScrollLeft ? "btn-ghost" : "btn-disabled"}`}
                onClick={scrollLeft}
                disabled={!canScrollLeft}
              >
                <FiChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="scroll right tasks"
                className={`btn btn-circle btn-sm ${canScrollRight ? "btn-ghost" : "btn-disabled"}`}
                onClick={scrollRight}
                disabled={!canScrollRight}
              >
                <FiChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {overdueTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <div className="text-success mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-success font-medium">Great job!</p>
            <p className="text-base-content/70 text-sm">No overdue tasks</p>
          </div>
        ) : (
          <>
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-none pb-2"
              onScroll={checkScrollButtons}
            >
              {overdueTasks.map((task) => {
                const overdueInfo = getOverdueInfo(task.due);

                return (
                  <div
                    key={task.id}
                    className="flex-shrink-0 w-80 p-3 rounded-lg border border-error/20 bg-error/5 hover:bg-error/10 transition-colors cursor-pointer"
                    onClick={() => handleTaskClick(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleTaskClick(task.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${getUrgencyColor(overdueInfo.urgencyLevel)} animate-pulse`}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-medium truncate pr-2" title={task.title}>
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-1">
                            <div className={`badge badge-xs ${getPriorityBadgeClass(task.priority)}`}>
                              {task.priority}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-base-content/70 flex items-center gap-1">
                              <FiUser className="h-3 w-3" />
                              <span className="truncate max-w-[120px]" title={task.project}>
                                {task.project}
                              </span>
                            </span>
                            <span className="text-error font-medium flex items-center gap-1 whitespace-nowrap">
                              <FiClock className="h-3 w-3" />
                              {overdueInfo.overdueText}
                            </span>
                          </div>

                          {task.assignedBy && (
                            <div
                              className="text-xs text-base-content/60 truncate"
                              title={`Assigned by: ${task.assignedBy}`}
                            >
                              Assigned by: {task.assignedBy}
                            </div>
                          )}

                          {task.progress > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span>Progress</span>
                                <span>{task.progress}%</span>
                              </div>
                              <progress
                                className="progress progress-error progress-xs w-full"
                                value={task.progress}
                                max="100"
                              />
                            </div>
                          )}

                          <div className="flex gap-2 pt-2">
                            <button
                              type="button"
                              className="btn btn-error btn-xs flex-1"
                              onClick={(e) => handleStartTask(e, task.id)}
                            >
                              Start Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="divider my-2" />

            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-error btn-sm flex-1"
                onClick={() => onTaskAction?.("viewAllOverdue", 0)}
              >
                View All Overdue ({overdueTasks.length})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

OverdueTasksCarousel.defaultProps = {
  onTaskAction: undefined,
  maxItems: 10,
};
