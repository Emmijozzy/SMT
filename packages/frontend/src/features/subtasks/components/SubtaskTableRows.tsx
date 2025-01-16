import User from "../../../shared/components/User";
import formatDate from "../../../shared/utils/formatDate";
import { ISubtask } from "../subtaskInterface";
import { PriorityCell } from "./cells/PriorityCell";
import { StatusCell } from "./cells/StatusCell";

export const useSubtaskTableRows = (subtask: ISubtask) => [
  { label: "ID", value: subtask?.subtaskId },
  { label: "Title", value: subtask?.title },
  {
    label: "Assignee",
    value: <User userId={subtask?.assignee} index={0} withName />,
  },
  {
    label: "Status",
    value: <StatusCell status={subtask?.status || "not started"} />,
  },
  {
    label: "Priority",
    value: <PriorityCell priority={subtask?.priority || ""} />,
  },
  { label: "Created At", value: subtask?.createdAt ? formatDate(new Date(subtask.createdAt)) : "" },
  { label: "Due Date", value: subtask?.dueDate ? formatDate(new Date(subtask.dueDate)) : "" },
  { label: "Description", value: subtask?.description },
];
