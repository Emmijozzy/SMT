import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import EditIcon from "@mui/icons-material/Edit";
import { ReactNode } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../app/store";
import Avartar from "../../shared/components/Avartar";
import DetailsContainer from "../../shared/components/DetailsContainer";
import formatDate from "../../shared/utils/formatDate";
import PriorityIndicator from "../tasks/TasksTable/components/PriorityIndicator";
import StatusIndicator from "../tasks/TasksTable/components/StatusIndicator";
import useRole from "../users/hooks/useRole";
import { subtasksSelectors } from "./subtaskSlice";

type Props = {
  showEdit: () => void;
  showDeleteModal: () => void;
};

function ViewSubtaskDetails({ showEdit, showDeleteModal }: Props) {
  const { subtaskId } = useParams();

  const subtask = useSelector((state: RootState) => subtasksSelectors.selectById(state, subtaskId || ""));

  const role = useRole();

  const SubtaskTableRows: { label: string; value: string | ReactNode; className?: string }[] = [
    { label: "ID", value: subtask?.subtaskId },
    { label: "Title", value: subtask?.title },
    {
      label: "Assignee",
      value: (
        <div className="flex gap-2 items-center">
          <Avartar
            imgUrl="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
            name="John Doe"
            className="w-8 h-8 rounded-full"
          />
          <p className="capitalize">{subtask?.assignee}</p>
        </div>
      ),
    },
    {
      label: "Status",
      value: (
        <div className="flex gap-2 items-center">
          <StatusIndicator
            status={subtask?.status as "not started" | "completed" | "closed" | "in progress" | "open"}
          />
          <p className="capitalize">{subtask?.status}</p>
        </div>
      ),
    },
    {
      label: "Priority",
      value: (
        <div className="flex gap-1 items-center">
          <PriorityIndicator priority={subtask?.priority} />
          <p className="capitalize">{subtask?.priority}</p>
        </div>
      ),
    },
    { label: "Created At", value: subtask?.createdAt ? formatDate(new Date(subtask.createdAt)) : "" },
    { label: "Deu Date", value: subtask?.dueDate ? formatDate(new Date(subtask.dueDate)) : "" },
    { label: "Description", value: subtask?.description },
  ];

  const renderActionButtons = () => (
    <div className="flex items-center gap-2">
      {role === "admin" && (
        <button
          type="button"
          aria-label="Edit Task"
          className="cursor-pointer hover:text-base-content/40"
          onClick={showEdit}
        >
          <EditIcon className="w-7 h-7 hover:text-warning cursor-pointer" />
        </button>
      )}

      {role === "admin" && (
        <button onClick={showDeleteModal} type="button" aria-label="Delete task" className="outline-none">
          <RiDeleteBin6Line className="h-6 w-6 text-base-content/70 hover:text-error cursor-pointer" />
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

  return (
    <div className="container transition-all">
      <div className="w-full flex flex-col bg-base-200">
        <div className="w-full flex justify-between">
          <h6 className="h6 px-2">Details</h6>
          {renderActionButtons()}
        </div>
        <DetailsContainer tableRows={SubtaskTableRows} />
      </div>
    </div>
  );
}
export default ViewSubtaskDetails;
