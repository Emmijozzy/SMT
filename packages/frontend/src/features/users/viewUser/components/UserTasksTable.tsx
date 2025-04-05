import LoadingSpinner from "../../../../shared/components/LoadingSpinner";
import MasterTable from "../../../../shared/components/masterTable/MasterTable";
import { ISubtask } from "../../../subtasks/subtaskInterface";
import UserTaskTableRow from "../../components/userTaskTableRow";
import { USER_TASK_COLUMNS } from "../constants/tableConfig";
import { UserTasksTableProps } from "../types";

function UserTasksTable({ data, isLoading }: UserTasksTableProps) {
  let content;

  if (isLoading) {
    content = (
      <div className="container min-h-64">
        <div className="flex h-full justify-center items-center bg-base-200 rounded-lg">
          <LoadingSpinner />
        </div>
      </div>
    );
  } else if (data.length === 0) {
    content = (
      <div className="container min-h-64">
        <div className="flex h-full justify-center items-center bg-base-200 rounded-lg">
          <p className="text-error">No tasks found</p>
        </div>
      </div>
    );
  } else if (data.length > 0) {
    const UserTaskMasterTable = MasterTable<ISubtask & Record<string, unknown>>();
    // console.log(data);

    content = (
      <UserTaskMasterTable
        className="w-full"
        name="User Subtask"
        data={data}
        tableHead={USER_TASK_COLUMNS}
        TableBody={UserTaskTableRow}
      />
    );
  }

  return content;
}
export default UserTasksTable;
