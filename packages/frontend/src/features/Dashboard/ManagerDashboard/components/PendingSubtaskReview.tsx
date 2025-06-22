/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { MouseEvent, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiClock, FiUser } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { ManagerTask } from "../type";

interface PendingReviewCarouselProps {
  tasks: ManagerTask[];
  maxItems?: number;
  onTaskAction?: (action: string, taskId: number) => void;
}

export function PendingSubtaskReview({ tasks, maxItems = 10, onTaskAction }: PendingReviewCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const pendingReviewTasks = tasks
    .filter((task) => task.status === "in-review")
    .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
    .slice(0, maxItems);

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

  const handleReviewTask = (e: MouseEvent, taskId: number) => {
    e.stopPropagation();
    onTaskAction?.("review", taskId);
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
      const cardWidth = 320;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
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
  }, [pendingReviewTasks]);

  return (
    <div className="card bg-base-100 shadow-sm border-l-4 border-l-primary">
      <div className="card-body">
        <div className="flex items-center justify-between mb-4">
          <h3 className="card-title text-lg flex items-center text-primary">
            <MdOutlineRateReview className="h-5 w-5 mr-2" />
            Pending Review
            {pendingReviewTasks.length > 0 && (
              <div className="badge badge-primary badge-sm ml-2">{pendingReviewTasks.length}</div>
            )}
          </h3>

          {pendingReviewTasks.length > 0 && (
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

        {pendingReviewTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <div className="text-success mb-2">
              <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-success font-medium">All caught up!</p>
            <p className="text-base-content/70 text-sm">No tasks pending review</p>
          </div>
        ) : (
          <>
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto scrollbar-none pb-2"
              onScroll={checkScrollButtons}
            >
              {pendingReviewTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex-shrink-0 w-80 p-3 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer"
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
                          <span className="text-primary font-medium flex items-center gap-1 whitespace-nowrap">
                            <FiClock className="h-3 w-3" />
                            Due: {new Date(task.due).toLocaleDateString()}
                          </span>
                        </div>

                        {task.assignedTo && (
                          <div
                            className="text-xs text-base-content/60 truncate"
                            title={`Submitted by: ${task.assignedTo}`}
                          >
                            Submitted by: {task.assignedTo}
                          </div>
                        )}

                        {task.progress > 0 && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <progress
                              className="progress progress-primary progress-xs w-full"
                              value={task.progress}
                              max="100"
                            />
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            className="btn btn-primary btn-xs flex-1"
                            onClick={(e) => handleReviewTask(e, task.id)}
                          >
                            Review Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="divider my-2" />

            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-primary btn-sm flex-1"
                onClick={() => onTaskAction?.("viewAllPendingReview", 0)}
              >
                View All Pending Review ({pendingReviewTasks.length})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

PendingSubtaskReview.defaultProps = {
  onTaskAction: undefined,
  maxItems: 10,
};
