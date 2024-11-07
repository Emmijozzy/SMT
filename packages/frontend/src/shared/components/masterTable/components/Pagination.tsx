/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lonely-if */
/* eslint-disable no-plusplus */
import { ChangeEvent, useEffect } from "react";
import getPageNumbers from "../../../utils/getRoleNumbers";

type Props = {
  totalRows: number;
  rowsPerPageOptions?: number[];
  rowsPerPage: number;
  setCurrentPage: (currentPage: number) => void;
  setRowsPerPage: (row: number) => void;
  currentPage: number;
};

function Pagination({
  totalRows,
  rowsPerPage,
  setRowsPerPage,
  currentPage,
  setCurrentPage,
  rowsPerPageOptions = [5, 10, 15, 20],
}: Props) {
  // Calculate total pages
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [rowsPerPage, totalPages, currentPage]);

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newRowsPerPage = Number(event.target.value);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // console.log(pageNumbers, currentPage);

  return (
    <div className="w-full flex items-center justify-between my-2 px-2 box-border gap-4 flex-grow whitespace-nowrap overflow-auto">
      <div className="flex items-center space-x-2">
        <label htmlFor="rowsPerPage" className="text-sm font-medium text-base-content/80">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="block w-20 py-1 px-2 border border-accent-content bg-base-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary-content sm:text-sm"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium text-base-content/80">Total: {totalRows}</p>
      </div>

      <div className="join">
        {pageNumbers.map((pageNumber) => (
          <button
            type="button"
            key={pageNumber}
            className={`join-item btn border-2 border-base-content/30  ${
              pageNumber === currentPage ? "btn-active" : ""
            } ${pageNumber === "..." ? "btn-disabled" : ""}`}
            onClick={() => typeof pageNumber === "number" && handlePageChange(pageNumber)}
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  rowsPerPageOptions: [5, 10, 15, 20],
};

export default Pagination;
