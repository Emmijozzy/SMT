import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import MasterTable from "../../../../shared/components/masterTable/MasterTable";
import { getPresentUser } from "../../../profile/userProfileSlice";
import SubtaskRow from "../../components/SubtaskRow";
import { subtaskColumns } from "../../constants/subtaskColumns";
import { useGetSubtasksQuery } from "../../subtaskApiSlice";
import { ISubtask } from "../../subtaskInterface";

const TASK_STATUS = {
  OPEN: "open",
  IN_PROCESS: "in_process",
  IN_REVIEW: "in_review",
  REVISIT: "revisit",
  COMPLETED: "completed",
} as const;

function SubtaskTable() {
  const [showSection, setShowSection] = useState("all");
  const userId = useSelector((state: RootState) => getPresentUser(state))?.userId ?? "";
  const { data: subtasks } = useGetSubtasksQuery({ assignee_like: userId });
  const OpenSubtaskTable = MasterTable<ISubtask & Record<string, unknown>>();

  const filteredTasks = useMemo(
    () => ({
      all: subtasks ?? [],
      open: subtasks?.filter((task) => task.status === TASK_STATUS.OPEN) ?? [],
      inProgress: subtasks?.filter((task) => task.status === TASK_STATUS.IN_PROCESS) ?? [],
      inReview: subtasks?.filter((task) => task.status === TASK_STATUS.IN_REVIEW) ?? [],
      revisit: subtasks?.filter((task) => task.status === TASK_STATUS.REVISIT) ?? [],
      completed: subtasks?.filter((task) => task.status === TASK_STATUS.COMPLETED) ?? [],
    }),
    [subtasks],
  );

  const handleShowSection = (section: string) => {
    setShowSection(section);
  };

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
            name="Subtask"
            tableHead={subtaskColumns}
            data={tasks as (ISubtask & Record<string, unknown>)[]}
            TableBody={SubtaskRow}
          />
        </div>
      </div>
    ),
    [OpenSubtaskTable, showSection],
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
