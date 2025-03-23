import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import Section from "../../../shared/components/Section";
import Subtask from "../../subtasks/components/Subtask";
import { useSubtaskChangeStatusEvent } from "../../subtasks/hooks/useSubtaskChangeStatusEvent";
import { useSubtaskCreatedEvent } from "../../subtasks/hooks/useSubtaskCreadtedEvent";
import { useSubtaskDeletedEvent } from "../../subtasks/hooks/useSubtaskDeletedEvent";
import { useSubtaskUpdatedEvent } from "../../subtasks/hooks/useSubtaskUpdatedEvent";
import { useGetSubtasksQuery } from "../../subtasks/subtaskApiSlice";
import { ISubtask } from "../../subtasks/subtaskInterface";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import EditTaskDetails from "./components/EditTaskDetails";
import ViewTaskDetails from "./components/ViewTaskDetail";

function ViewTask() {
  const [showWEditDetails, setShowWEditDetails] = useState(false);
  const [updatedSubtasks, setUpdatedSubtasks] = useState<ISubtask[]>([]);
  const { subtaskCreated, clearSubtaskCreated } = useSubtaskCreatedEvent();
  const { subtaskUpdated, clearSubtaskUpdated } = useSubtaskUpdatedEvent();
  const { subtaskDeleted, clearSubtaskDeleted } = useSubtaskDeletedEvent();
  const { subtaskChangeStatus, clearSubtaskChangeStatus } = useSubtaskChangeStatusEvent();

  const { taskId } = useParams();
  const taskIdString = taskId ?? "";

  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskIdString)) as ITask;

  const { data: taskSubtasks } = useGetSubtasksQuery({ taskId_like: taskId } as Record<string, string>, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 30000,
  });

  useEffect(() => {
    if (subtaskUpdated.length > 0) {
      setUpdatedSubtasks((prev) => {
        const updatedSubtasksList = [...prev];
        subtaskUpdated.forEach((updatedTask) => {
          const existingTaskIndex = updatedSubtasksList.findIndex(
            (subtask) => subtask.subtaskId === updatedTask.subtaskId,
          );
          if (existingTaskIndex !== -1) {
            updatedSubtasksList[existingTaskIndex] = updatedTask;
          }
        });
        return updatedSubtasksList;
      });
      clearSubtaskUpdated();
    }
  }, [clearSubtaskUpdated, subtaskUpdated]);

  useEffect(() => {
    if (subtaskCreated.length > 0) {
      setUpdatedSubtasks((pre) => [...pre, ...subtaskCreated]);
      // console.log("subtaskCreated", subtaskCreated);
      clearSubtaskCreated();
    } else if (updatedSubtasks?.length === 0 && taskSubtasks && taskSubtasks?.length > 0) {
      setUpdatedSubtasks(taskSubtasks);
    }
  }, [subtaskCreated, taskSubtasks, clearSubtaskCreated, updatedSubtasks?.length]);

  useEffect(() => {
    if (subtaskDeleted.length > 0) {
      setUpdatedSubtasks((pre) =>
        pre.filter((subtask) =>
          subtaskDeleted.every((deletedSubtask) => subtask.subtaskId !== deletedSubtask.subtaskId),
        ),
      );
      clearSubtaskDeleted();
    }
  }, [subtaskDeleted, clearSubtaskDeleted]);

  useEffect(() => {
    if (subtaskChangeStatus.length > 0) {
      setUpdatedSubtasks((pre) => {
        const updatedSubtasksList = [...pre];
        subtaskChangeStatus.forEach((updatedTask) => {
          const existingTaskIndex = updatedSubtasksList.findIndex(
            (subtask) => subtask.subtaskId === updatedTask.subtaskId,
          );
          if (existingTaskIndex !== -1) {
            updatedSubtasksList[existingTaskIndex] = updatedTask;
          }
        });
        return updatedSubtasksList;
      });
      clearSubtaskChangeStatus();
    }
  }, [subtaskChangeStatus, clearSubtaskChangeStatus]);

  const memoizedSubtask = useMemo(() => {
    if (updatedSubtasks?.length > 0) {
      return updatedSubtasks;
    }
    return taskSubtasks ?? [];
  }, [taskSubtasks, updatedSubtasks]);

  let content;

  if (getTask) {
    content = (
      <Section>
        {showWEditDetails ? (
          <EditTaskDetails handleEditTaskDetails={() => setShowWEditDetails(!showWEditDetails)} taskId={taskIdString} />
        ) : (
          <ViewTaskDetails task={getTask} handleEditTaskDetails={() => setShowWEditDetails(!showWEditDetails)} />
        )}

        {/* Sub Task section */}
        <Subtask subtasks={memoizedSubtask as unknown as Partial<ISubtask>[]} />
      </Section>
    );
  }

  return content;
}

export default ViewTask;
