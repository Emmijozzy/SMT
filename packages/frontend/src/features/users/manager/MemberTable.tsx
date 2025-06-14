import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { IUser } from "../userInterface";
import MemberRow from "./MemberRow";
import { membersColumns } from "./membersColumns";
import useMemberTable from "./useMembertable";

function MemberTable() {
  const { memoizedData, isLoading } = useMemberTable();
  const MemberMasterTable = MasterTable<IUser & Record<string, unknown>>();

  return (
    <MemberMasterTable
      className="h-full"
      name="Members"
      data={memoizedData as (IUser & Record<string, unknown>)[]}
      tableHead={membersColumns}
      TableBody={MemberRow}
      isLoading={isLoading}
    />
  );
}

export default MemberTable;
