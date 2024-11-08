import { TableHeaderProps } from "../../../../shared/components/masterTable/MasterTable";

const userColumnFactory = (teamNames: string[]) => {
  const teamUserColumn: TableHeaderProps = {
    className: "",
    columns: [
      {
        label: "name",
        searchable: true,
        sortable: true,
        filterable: false,
      },
      {
        label: "email",
        searchable: true,
        sortable: true,
        filterable: false,
      },
      {
        label: "team",
        searchable: false,
        sortable: true,
        filterable: true,
        filterOptions: [...teamNames],
      },
      {
        label: "role",
        searchable: false,
        sortable: true,
        filterable: true,
        filterOptions: ["team_member", "manager", "admin"],
      },
      {
        label: "status",
        searchable: false,
        sortable: true,
        filterable: true,
        filterOptions: ["active", "inactive"],
      },
      {
        label: "joined",
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

  return teamUserColumn;
};

export default userColumnFactory;
