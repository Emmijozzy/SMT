/* eslint-disable indent */
import React from "react";

type Props = {
  status: "not started" | "in progress" | "completed" | "closed";
};

function StatusIndicator({ status }: Props) {
  let svgContent;

  switch (status.toLowerCase()) {
    case "not started":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#FFA500" />
          <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">
            ?
          </text>
        </svg>
      );
      break;
    case "in progress":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#007BFF" />
          <path d="M12 7V12H17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
      break;
    case "completed":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#28A745" />
          <path d="M8 12l2 2 4-4" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
      break;
    case "closed":
      svgContent = (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#DC3545" />
          <path d="M16 8L8 16M8 8l8 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
      break;
    default:
      svgContent = null;
  }

  return svgContent;
}

export default StatusIndicator;
