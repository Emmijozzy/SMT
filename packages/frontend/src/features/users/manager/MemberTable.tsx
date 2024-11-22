import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import MasterTable, { TableHeaderProps } from "../../../shared/components/masterTable/MasterTable";
import { IUser } from "../userInterface";
import { usersSelectors } from "../userSlice";
import MemberRow from "./MemberRow";
import useMemberTable from "./useMembertable";

function MemberTable() {
  useMemberTable();

  const users = useSelector((state: RootState) => usersSelectors.selectAll(state));

  const membersColumns: TableHeaderProps = {
    className: "",
    columns: [
      {
        label: "Name",
        searchable: true,
        sortable: true,
        filterable: false,
      },
      {
        label: "Email",
        searchable: true,
        sortable: true,
        filterable: false,
      },
      {
        label: "Role",
        searchable: true,
        sortable: true,
        filterable: false,
      },
      {
        label: "Status",
        searchable: false,
        sortable: true,
        filterable: true,
      },
      {
        label: "Joined",
        searchable: false,
        sortable: true,
        filterable: false,
      },
      {
        label: "",
        searchable: false,
        sortable: false,
        filterable: false,
      },
    ],
  };

  const MemberMasterTable = MasterTable<IUser & Record<string, unknown>>();

  return (
    // <div className="container">
    <MemberMasterTable
      className="h-full"
      name="Members"
      data={users as (IUser & Record<string, unknown>)[]}
      tableHead={membersColumns}
      TableBody={MemberRow}
    />
    // </div>
  );
}

export default MemberTable;
