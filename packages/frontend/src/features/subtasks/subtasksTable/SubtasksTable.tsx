import MasterTable from "../../../shared/components/masterTable/MasterTable";
import SubtaskRow from "../components/SubtaskRow";
import { subtaskColumns } from "../constants/subtaskColumns";
import { useGetSubtasksQuery } from "../subtaskApiSlice";
import { ISubtask } from "../subtaskInterface";

function SubtasksTable() {
  const { data: subtasks } = useGetSubtasksQuery(undefined);

  const SubtaskTable = MasterTable<ISubtask & Record<string, unknown>>();

  return (
    <SubtaskTable
      name="Subtask"
      tableHead={subtaskColumns}
      data={(subtasks as (ISubtask & Record<string, unknown>)[]) || []}
      TableBody={SubtaskRow}
    />
  );
}

export default SubtasksTable;
