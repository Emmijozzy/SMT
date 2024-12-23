import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { IUser } from "../userInterface";
import { usersSelectors } from "../userSlice";
import MemberRow from "./MemberRow";
import useMemberTable from "./useMembertable";
import { membersColumns } from "./membersColumns";

function MemberTable() {
  useMemberTable();

  const users = useSelector((state: RootState) => usersSelectors.selectAll(state));

  const MemberMasterTable = MasterTable<IUser & Record<string, unknown>>();

  return (
    <MemberMasterTable
      className="h-full"
      name="Members"
      data={users as (IUser & Record<string, unknown>)[]}
      tableHead={membersColumns}
      TableBody={MemberRow}
    />
  );
}

export default MemberTable;
