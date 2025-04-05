/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import { Status } from "../interface/status";

type Props = {
  status: Status;
};

const statusMap: Record<Status, { color: string }> = {
  open: { color: "#FFA500" },
  "not started": { color: "#FFA500" },
  in_process: { color: "#007BFF" },
  "in progress": { color: "#007BFF" },
  completed: { color: "#28A745" },
  closed: { color: "#DC3545" },
  in_review: { color: "#17A2B8" },
  revisit: { color: "#6C757D" },
};
function StatusIndicator({ status }: Props) {
  const { color } = statusMap[status] || { color: "#000000" };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill={color} />
      {status === "open" || status === "not started" ? (
        <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
          ?
        </text>
      ) : status === "in_process" ? (
        <path d="M12 7V12H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      ) : status === "completed" ? (
        <path d="M8 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      ) : status === "closed" ? (
        <path d="M16 8L8 16M8 8l8 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      ) : status === "in_review" ? (
        <circle cx="12" cy="12" r="4" fill="#FFFFFF" />
      ) : status === "revisit" ? (
        <path d="M9 12h6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

export default StatusIndicator;
