/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-lonely-if */
/* eslint-disable no-plusplus */
import { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
// import { setCurrentPage, setRowsPerPage } from "../tasksTableSlice";
import getPageNumbers from "../../../../shared/utils/getRoleNumbers";

type Props = {
  totalRows: number;
  rowsPerPageOptions?: number[];
};

function Pagination({ totalRows, rowsPerPageOptions = [5, 10, 15, 20] }: Props) {
  const rowsPerPage = 5;
  const currentPage = 1;

  // const dispatch = useDispatch();

  // Calculate total pages
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // useEffect(() => {
  //   if (currentPage > totalPages) {
  //     dispatch(setCurrentPage(1));
  //   }
  // }, [rowsPerPage, totalPages, currentPage, dispatch]);

  const pageNumbers = getPageNumbers(totalPages, currentPage);

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    // const newRowsPerPage = Number(event.target.value);
    // dispatch(setRowsPerPage(newRowsPerPage));
    // dispatch(setCurrentPage(1)); // Reset to the first page when rows per page changes
  };

  const handlePageChange = (page: number) => {
    // dispatch(setCurrentPage(page));
  };

  // console.log(pageNumbers, currentPage);

  return (
    <div className="w-full flex items-center justify-between my-2 px-2">
      <div className="flex items-center space-x-2">
        <label htmlFor="rowsPerPage" className="text-sm font-medium text-gray-700">
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
