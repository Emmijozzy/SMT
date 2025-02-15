import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { getPresentUser } from "../../profile/userProfileSlice";
import SubtaskRow from "../components/SubtaskRow";
import { subtaskColumns } from "../constants/subtaskColumns";
import { useGetSubtasksQuery } from "../subtaskApiSlice";
import { ISubtask } from "../subtaskInterface";

function SubtasksTable() {
  const userProfile = useSelector((state: RootState) => getPresentUser(state));

  const { data: subtasks } = useGetSubtasksQuery(
    userProfile.role !== "admin" ? { team_like: userProfile?.teamId ?? "" } : undefined,
    {
      pollingInterval: 15000, // Refresh every 15 seconds
      refetchOnMountOrArgChange: true, // Force refetch on mount
      refetchOnFocus: true, // Refetch when window regains focus
    },
  );

  const SubtaskTable = MasterTable<ISubtask & Record<string, unknown>>();

  const tableData = (subtasks || []) as (ISubtask & Record<string, unknown>)[];

  return <SubtaskTable name="Subtask" tableHead={subtaskColumns} data={tableData} TableBody={SubtaskRow} />;
}
export default SubtasksTable;
