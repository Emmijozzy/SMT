import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import Section from "../../../shared/components/Section";
import { ITask } from "../tasksInterface";
import { tasksSelectors } from "../tasksSlice";
import EditTaskDetails from "./components/EditTaskDetails";
import ViewTaskDetails from "./components/ViewTaskDetail";

function ViewTask() {
  const [showWEditDetails, setShowWEditDetails] = useState(false);
  const { taskId } = useParams();
  const taskIdString = taskId || "";

  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskIdString)) as ITask;

  let content;

  if (getTask) {
    content = (
      <Section>
        {showWEditDetails ? (
          <EditTaskDetails handleEditTaskDetails={() => setShowWEditDetails(!showWEditDetails)} taskId={taskIdString} />
        ) : (
          <ViewTaskDetails task={getTask} handleEditTaskDetails={() => setShowWEditDetails(!showWEditDetails)} />
        )}

        {/* Main container for the task details */}

        {/* Assignee section */}
        <div className="container">
          <div className="w-full">
            <h6 className="h6">Assignee</h6>
          </div>
        </div>

        {/* Sub Task section */}
        <div className="container">
          <div className="w-full">
            <h6 className="h6">Sub Task</h6>
          </div>
        </div>
      </Section>
    );
  }

  return content;
}

export default ViewTask;
