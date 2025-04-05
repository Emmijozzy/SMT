import { TableHeaderProps } from "../../../../shared/components/masterTable/MasterTable";

export const USER_TASK_COLUMNS: TableHeaderProps = {
  className: "capitalize",
  columns: [
    {
      label: "Title",
      searchable: true,
      sortable: true,
      filterable: false,
    },
    {
      label: "Status",
      searchable: true,
      sortable: true,
      filterable: true,
      filterOptions: ["open", "in review", "revisit", "completed"],
    },
    {
      label: "Priority",
      searchable: true,
      sortable: true,
      filterable: true,
      filterOptions: ["low", "medium", "high"],
    },
    {
      label: "Due Date",
      searchable: true,
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
