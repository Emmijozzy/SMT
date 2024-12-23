import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import Section from "../../../shared/components/Section";
import Subtask from "../../subtasks/components/Subtask";
import { useGetSubtasksQuery } from "../../subtasks/subtaskApiSlice";
import { ISubtask } from "../../subtasks/subtaskInterface";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import EditTaskDetails from "./components/EditTaskDetails";
import ViewTaskDetails from "./components/ViewTaskDetail";

function ViewTask() {
  const [showWEditDetails, setShowWEditDetails] = useState(false);
  const { taskId } = useParams();
  const taskIdString = taskId ?? "";

  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskIdString)) as ITask;

  const { data: taskSubtasks } = useGetSubtasksQuery({ taskId_like: taskId } as Record<string, string>);

  const memoizedSubtask = useMemo(() => taskSubtasks || getTask?.subtasks, [taskSubtasks, getTask]);

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
