import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { getPresentUser } from "../../profile/userProfileSlice";
import SubtaskRow from "../components/SubtaskRow";
import { subtaskColumns } from "../constants/subtaskColumns";
import { useGetSubtasksQuery } from "../subtaskApiSlice";
import { ISubtask } from "../subtaskInterface";
import { subtasksSelectors } from "../subtaskSlice";

function SubtasksTable() {
  const userProfile = useSelector((state: RootState) => getPresentUser(state));

  const savedSubtasks = useSelector((state: RootState) => subtasksSelectors.selectAll(state));

  const { data: subtasks } = useGetSubtasksQuery(
    userProfile.role !== "admin" ? { team_like: userProfile?.teamId ?? "" } : undefined,
  );

  const SubtaskTable = MasterTable<ISubtask & Record<string, unknown>>();

  const tableData = (savedSubtasks || subtasks || []) as (ISubtask & Record<string, unknown>)[];

  return <SubtaskTable name="Subtask" tableHead={subtaskColumns} data={tableData} TableBody={SubtaskRow} />;
}
export default SubtasksTable;
