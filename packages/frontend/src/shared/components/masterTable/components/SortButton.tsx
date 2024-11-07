import SwapVertIcon from "@mui/icons-material/SwapVert";
import { memo } from "react";

interface SortButtonProps {
  show: boolean;
  onClick: () => void;
  active: boolean;
}

export const SortButton = memo(({ show, onClick, active }: SortButtonProps) => {
  if (!show) return null;

  return (
    <button
      type="button"
      aria-label="Sort"
      className={`btn h-4 min-h-4 p-0 ${active ? "btn-active text-secondary" : "btn-ghost"}`}
      onClick={onClick}
    >
      <SwapVertIcon className="w-4 h-4" />
    </button>
  );
});

SortButton.displayName = "SortButton";
