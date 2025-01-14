import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import EditIcon from "@mui/icons-material/Edit";
import { RiDeleteBin6Line } from "react-icons/ri";

interface SubtaskActionsProps {
  role: string;
  showEdit: () => void;
  showDeleteModal: () => void;
}

export function SubtaskActions({ role, showEdit, showDeleteModal }: SubtaskActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {role === "admin" && (
        <>
          <button
            type="button"
            aria-label="Edit Task"
            className="cursor-pointer hover:text-base-content/40"
            onClick={showEdit}
          >
            <EditIcon className="w-7 h-7 hover:text-warning cursor-pointer" />
          </button>
          <button onClick={showDeleteModal} type="button" aria-label="Delete task" className="outline-none">
            <RiDeleteBin6Line className="h-6 w-6 text-base-content/70 hover:text-error cursor-pointer" />
          </button>
        </>
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
}
