import { memo } from "react";
import { getHeaderClassName } from "../utils/getHeaderClassName";
import { FilterDropdown } from "./FilterDropdown";
import { SortButton } from "./SortButton";

type Props = {
  className: string;
  columns: {
    label: string;
    as?: string;
    sortable?: boolean;
    filterable?: boolean;
    filterOptions?: string[];
  }[];
  onSort: (column: string) => void;
  onFilter: (option: string, column: string) => void;
  sortedBy: string;
};

const TableHeader = memo(({ className, columns, onSort, onFilter, sortedBy }: Props) => (
  <thead className="sticky top-0 z-10">
    <tr className="overflow-hidden">
      {columns.map((column, index) => (
        <th
          key={column.label}
          className={`${getHeaderClassName(index)} ${className || ""} sticky top-0`}
          style={{ position: "sticky", top: 0 }}
        >
          <div className="flex items-center gap-1 whitespace-nowrap">
            <SortButton
              show={column.sortable || false}
              onClick={() => onSort(column.label)}
              active={sortedBy === column.label}
            />
            <FilterDropdown
              show={column.filterable || false}
              options={column.filterOptions || []}
              onSelect={(option) => onFilter(option, column.label)}
            />
            {column.as || column.label}
          </div>
        </th>
      ))}
    </tr>
  </thead>
));

export default TableHeader;
