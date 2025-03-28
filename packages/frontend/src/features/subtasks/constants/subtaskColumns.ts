import { TableHeaderProps } from "../../../shared/components/masterTable/MasterTable";
import { SubtaskStatus } from "../SubtaskStatus";

export const subtaskColumns: TableHeaderProps = {
  className: "",
  columns: [
    {
      label: "title",
      searchable: true,
      sortable: true,
      filterable: false,
    },
    {
      label: "assignee",
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
      filterOptions: [SubtaskStatus.Open, SubtaskStatus.InReview, SubtaskStatus.Revisit, SubtaskStatus.Completed],
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
  ],
};
