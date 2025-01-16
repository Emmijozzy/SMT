import MasterTable from "../../../../shared/components/masterTable/MasterTable";
import { ISubtask } from "../../../subtasks/subtaskInterface";
import { UserTasksTableProps } from "../types";

function UserTasksTable({ data, columns, TableBody }: UserTasksTableProps) {
  const UserTaskMasterTable = MasterTable<ISubtask & Record<string, unknown>>();

  return (
    <UserTaskMasterTable className="w-full" name="User Subtask" data={data} tableHead={columns} TableBody={TableBody} />
  );
}
export default UserTasksTable;
