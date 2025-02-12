import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import { FaTrashRestore } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import PriorityIndicator from "../../../../shared/components/PriorityIndicator";
import StatusIndicator from "../../../../shared/components/StatusIndicator";
import useRole from "../../../users/hooks/useRole";
import { setShowModal, setTaskId } from "../../deleteTask/deleteTaskSlice";
import { ITask } from "../../tasksInterface";
import TaskDetailRow from "./TaskDetailRow";

type Props = {
  task: ITask;
  handleEditTaskDetails: () => void;
};

const ViewTaskDetail = React.memo(({ task, handleEditTaskDetails }: Props) => {
  const role = useRole();
  const { taskId, title, description, responsibleTeam, status, priority, dueDate, del_flg: delFlg } = task;

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setTaskId({ taskId, forDelete: true }));
    dispatch(setShowModal());
  };

  const handleRestore = () => {
    dispatch(setTaskId({ taskId, forDelete: false }));
    dispatch(setShowModal());
  };

  const formattedDueDate = new Date(dueDate).toISOString().split("T")[0];
  const formattedStartDate = new Date().toISOString().split("T")[0];

  const renderActionButtons = () => (
    <div className="flex items-center gap-2">
      {role === "admin" && !delFlg && (
        <button
          type="button"
          aria-label="Edit Task"
          className="cursor-pointer hover:text-base-content/40"
          onClick={handleEditTaskDetails}
        >
          <EditIcon className="w-7 h-7 hover:text-warning cursor-pointer" />
        </button>
      )}

      {role === "admin" && (
        <button
          type="button"
          aria-label={delFlg ? "Restore task" : "Delete task"}
          className="outline-none"
          onClick={delFlg ? handleRestore : handleDelete}
        >
          {delFlg ? (
            <FaTrashRestore className="h-6 w-6 text-base-content/70 hover:text-error cursor-pointer" />
          ) : (
            <RiDeleteBin6Line className="h-6 w-6 text-base-content/70 hover:text-error cursor-pointer" />
          )}
        </button>
      )}

      <button
        type="button"
        aria-label="Back to tasks"
        onClick={() => window.history.back()}
        className="cursor-pointer hover:text-base-content/40"
      >
        <ArrowBackSharpIcon className="w-12 h-8" />
      </button>
    </div>
  );

  const renderTaskDetails = () =>
    !delFlg ? (
      <>
        <TaskDetailRow label="Title" value={title} />
        <TaskDetailRow label="Description">
          <div className="lg:pr-40 max-h-40 overflow-y-auto lg:max-h-full lg:overflow-y-visible">
            <p className="text-justify">{description}</p>
          </div>
        </TaskDetailRow>
        <TaskDetailRow
          label="Team"
          value={typeof responsibleTeam === "string" ? responsibleTeam : responsibleTeam?.name}
        />
        <TaskDetailRow label="Status">
          <div className="flex gap-2 items-center">
            <StatusIndicator status={status} />
            <p className="capitalize">{status}</p>
          </div>
        </TaskDetailRow>
        <TaskDetailRow label="Priority">
          <div className="flex gap-1 items-center">
            <PriorityIndicator priority={priority} />
            <p className="capitalize">{priority}</p>
          </div>
        </TaskDetailRow>
        <TaskDetailRow label="Completion" value="60%" />
        <TaskDetailRow label="Start Date" value={formattedStartDate} />
        <TaskDetailRow label="Due Date" value={formattedDueDate} />
      </>
    ) : (
      <tr className="text-center">
        <td className="py-4 text-error">Task Deleted</td>
      </tr>
    );

  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col">
        <div className="w-full flex justify-between">
          <h6 className="h6">Details</h6>
          {renderActionButtons()}
        </div>
        <div className="w-full">
          <table className="w-full">
            <tbody>
              <TaskDetailRow label="Task ID" value={taskId} />
              {renderTaskDetails()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

ViewTaskDetail.displayName = "ViewTaskDetail";

export default ViewTaskDetail;
