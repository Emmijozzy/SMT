import FilterListIcon from "@mui/icons-material/FilterList";
import { memo } from "react";

interface FilterDropdownProps {
  show: boolean;
  options: string[];
  onSelect: (option: string) => void;
}

export const FilterDropdown = memo(({ show, options, onSelect }: FilterDropdownProps) => {
  if (!show || !options) return null;

  return (
    <div className="dropdown dropdown-hover">
      <button type="button" aria-label="Filter" className="btn h-2 min-h-2 p-0">
        <FilterListIcon className="w-4 h-4" />
      </button>
      <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
        <li>
          <button type="button" onClick={() => onSelect("")}>
            All
          </button>
        </li>
        {options.map((option) => (
          <li key={option}>
            <button type="button" className="capitalize" onClick={() => onSelect(option.toLowerCase())}>
              {option.replace("_", " ")}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

FilterDropdown.displayName = "FilterDropdown";
