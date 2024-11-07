import { TableHeaderProps } from "../../../../shared/components/masterTable/MasterTable";

const teamTaskColumn: TableHeaderProps = {
  className: "",
  columns: [
    {
      label: "title",
      searchable: true,
      sortable: true,
      filterable: false,
    },
    {
      label: "priority",
      searchable: false,
      sortable: true,
      filterable: true,
      filterOptions: ["Low", "Medium", "High"],
    },
    {
      label: "status",
      searchable: false,
      sortable: true,
      filterable: true,
      filterOptions: ["not started", "in progress", "completed", "closed"],
    },
    {
      label: "users",
      searchable: false,
      sortable: false,
      filterable: false,
    },
    {
      label: "completion",
      searchable: false,
      sortable: true,
      filterable: false,
    },
    {
      label: "due",
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
  ] as unknown as [
    { label: string; searchable: boolean; sortable?: boolean; filterable?: boolean; filterOptions?: string[] },
  ],
};

export default teamTaskColumn;
