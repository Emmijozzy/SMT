/* eslint-disable default-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { getPresentUser } from "../../profile/userProfileSlice";
import { UserRole } from "../../users/userRole";
import SubtaskRow from "../components/SubtaskRow";
import { subtaskColumns } from "../constants/subtaskColumns";
import { useSubtaskChangeStatusEvent } from "../hooks/useSubtaskChangeStatusEvent";
import { useSubtaskCreatedEvent } from "../hooks/useSubtaskCreadtedEvent";
import { useSubtaskDeletedEvent } from "../hooks/useSubtaskDeletedEvent";
import { useSubtaskReassignEvent } from "../hooks/useSubtaskReassignEvent";
import { useSubtaskUpdatedEvent } from "../hooks/useSubtaskUpdatedEvent";
import { useGetSubtasksQuery } from "../subtaskApiSlice";
import { ISubtask } from "../subtaskInterface";

// Memoize SubtaskRow component
const MemoizedSubtaskRow = React.memo(SubtaskRow);

function SubtaskTable() {
  const [updatedSubtasks, setUpdatedSubtasks] = useState<ISubtask[]>([]);
  const [showSection, setShowSection] = useState("all");
  const userProfile = useSelector((state: RootState) => getPresentUser(state));
  const { subtaskCreated, clearSubtaskCreated } = useSubtaskCreatedEvent();
  const { subtaskUpdated, clearSubtaskUpdated } = useSubtaskUpdatedEvent();
  const { subtaskReassigned, clearSubtaskReassigned } = useSubtaskReassignEvent();
  const { subtaskDeleted, clearSubtaskDeleted } = useSubtaskDeletedEvent();
  const { subtaskChangeStatus, clearSubtaskChangeStatus } = useSubtaskChangeStatusEvent();
  const role = userProfile?.role;

  // Memoize the TASK_STATUS object
  const TASK_STATUS = useMemo(
    () =>
      ({
        OPEN: "open",
        IN_PROCESS: "in_process",
        IN_REVIEW: "in_review",
        REVISIT: "revisit",
        COMPLETED: "completed",
      }) as const,
    [],
  );

  // Memoize the query object
  const query = useMemo(() => {
    switch (role) {
      case UserRole.Admin:
        return undefined;
      case UserRole.Manager:
        return userProfile?.teamId ? { team_like: userProfile.teamId } : undefined;
      case UserRole.TeamMember:
        return userProfile?.userId ? { assignee_like: userProfile.userId } : undefined;
      default:
        return userProfile?.userId ? { assignee_like: userProfile.userId } : undefined;
    }
  }, [role, userProfile?.teamId, userProfile?.userId]);

  const { data: subtasks, isLoading } = useGetSubtasksQuery(query, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    pollingInterval: 30000,
    refetchOnReconnect: true,
  });

  // Consolidated effect for handling all subtask events
  useEffect(() => {
    // Initialize with fetched subtasks if we don't have any yet
    if (subtasks && updatedSubtasks.length === 0) {
      setUpdatedSubtasks(subtasks);
      return;
    }

    let newSubtasks = [...updatedSubtasks];
    let hasChanges = false;

    // Handle created subtasks
    if (subtaskCreated.length > 0) {
      newSubtasks = [...newSubtasks, ...subtaskCreated];
      clearSubtaskCreated();
      hasChanges = true;
    }

    // Handle updated subtasks
    if (subtaskUpdated.length > 0) {
      subtaskUpdated.forEach((updatedTask) => {
        const existingTaskIndex = newSubtasks.findIndex((subtask) => subtask.subtaskId === updatedTask.subtaskId);
        if (existingTaskIndex !== -1) {
          newSubtasks[existingTaskIndex] = updatedTask;
        } else {
          newSubtasks.push(updatedTask);
        }
      });
      clearSubtaskUpdated();
      hasChanges = true;
    }

    // Handle reassigned subtasks
    if (subtaskReassigned.length > 0) {
      newSubtasks = newSubtasks.filter(
        (subtask) => !subtaskReassigned.some((reassigned) => reassigned.subtaskId === subtask.subtaskId),
      );
      clearSubtaskReassigned();
      hasChanges = true;
    }

    // Handle deleted subtasks
    if (subtaskDeleted.length > 0) {
      newSubtasks = newSubtasks.filter((subtask) =>
        subtaskDeleted.every((deletedSubtask) => subtask.subtaskId !== deletedSubtask.subtaskId),
      );
      clearSubtaskDeleted();
      hasChanges = true;
    }

    // Handle status changed subtasks
    if (subtaskChangeStatus.length > 0) {
      subtaskChangeStatus.forEach((updatedTask) => {
        const existingTaskIndex = newSubtasks.findIndex((subtask) => subtask.subtaskId === updatedTask.subtaskId);
        if (existingTaskIndex !== -1) {
          newSubtasks[existingTaskIndex] = updatedTask;
        }
      });
      clearSubtaskChangeStatus();
      hasChanges = true;
    }

    // Only update state if there are changes
    if (hasChanges) {
      setUpdatedSubtasks(newSubtasks);
    }
  }, [
    subtasks,
    updatedSubtasks,
    subtaskCreated,
    subtaskUpdated,
    subtaskReassigned,
    subtaskDeleted,
    clearSubtaskCreated,
    clearSubtaskUpdated,
    clearSubtaskReassigned,
    clearSubtaskDeleted,
  ]);

  const OpenSubtaskTable = MasterTable<ISubtask & Record<string, unknown>>();

  // Optimize filtering logic
  const filteredTasks = useMemo(() => {
    if (!updatedSubtasks.length) {
      return {
        all: [],
        open: [],
        inProgress: [],
        inReview: [],
        revisit: [],
        completed: [],
      };
    }

    // Create filtered arrays in a single pass
    const open: ISubtask[] = [];
    const inProgress: ISubtask[] = [];
    const inReview: ISubtask[] = [];
    const revisit: ISubtask[] = [];
    const completed: ISubtask[] = [];

    updatedSubtasks.forEach((task) => {
      switch (task.status) {
        case TASK_STATUS.OPEN:
          open.push(task);
          break;
        case TASK_STATUS.IN_PROCESS:
          inProgress.push(task);
          break;
        case TASK_STATUS.IN_REVIEW:
          inReview.push(task);
          break;
        case TASK_STATUS.REVISIT:
          revisit.push(task);
          break;
        case TASK_STATUS.COMPLETED:
          completed.push(task);
          break;
      }
    });

    return {
      all: updatedSubtasks,
      open,
      inProgress,
      inReview,
      revisit,
      completed,
    };
  }, [updatedSubtasks, TASK_STATUS]);

  // Memoize the section handler
  const handleShowSection = useCallback((section: string) => {
    setShowSection(section);
  }, []);

  // Memoize the section renderer
  const renderTaskSection = useCallback(
    (title: string, section: string, tasks: ISubtask[]) => (
      <div className="rounded-lg">
        <div className="h-14 flex items-center justify-between px-4">
          <div className="flex items-center">
            <button
              type="button"
              aria-label="Open Sidebar"
              onClick={() => handleShowSection(section)}
              className="h-full flex items-center mr-3"
            >
              <ArrowDropDownIcon className={`h-14 w-14 transition ${showSection === section ? "rotate-180" : ""}`} />
            </button>

            <h2 className="h6">{title}</h2>
          </div>
          <span className="badge badge-primary">{tasks.length}</span>
        </div>
        <div className={`transition-all ${showSection === section ? "" : "hidden"}`}>
          <OpenSubtaskTable
            name={title}
            tableHead={subtaskColumns}
            data={tasks as (ISubtask & Record<string, unknown>)[]}
            TableBody={MemoizedSubtaskRow}
            isLoading={isLoading}
          />
        </div>
      </div>
    ),
    [OpenSubtaskTable, showSection, handleShowSection],
  );

  return (
    <div className="border-2 border-base-content/20 rounded-lg ">
      {renderTaskSection("All Subtasks", "all", filteredTasks.all)}
      {renderTaskSection("Open Tasks", "open", filteredTasks.open)}
      {renderTaskSection("In Progress Tasks", "inProgress", filteredTasks.inProgress)}
      {renderTaskSection("In Review Tasks", "inReview", filteredTasks.inReview)}
      {renderTaskSection("Revisit Tasks", "revisit", filteredTasks.revisit)}
      {renderTaskSection("Completed Tasks", "completed", filteredTasks.completed)}
    </div>
  );
}

export default SubtaskTable;
