import { TableHeaderProps } from "../../../../shared/components/masterTable/MasterTable";

const userColumnFactory = () => {
  const teamUserColumn: TableHeaderProps = {
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
        label: "Opened Subtask",
        searchable: false,
        sortable: false,
        filterable: false,
      },
      {
        label: "Completed Subtask",
        searchable: false,
        sortable: false,
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

  return teamUserColumn;
};

export default userColumnFactory;
