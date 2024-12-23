import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { ChangeEvent } from "react";

type Props = {
  currentPage: number;
  numOfPage: number;
  handlePageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleToFirstPage: () => void;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleToLastPage: () => void;
};
function Pagination({
  currentPage,
  numOfPage,
  handlePageChange,
  handleToFirstPage,
  handlePreviousPage,
  handleNextPage,
  handleToLastPage,
}: Props) {
  return (
    <div className="w-full overflow-x-auto">
      <div className=" w-full flex flex-nowrap justify-between gap-1 pt-4 px-2">
        <div className=" w-32 gap-2 items-center font-bold text-md text-base-content/70">
          <span className="text-sm font-semibold capitalize">
            Page{" "}
            <input
              className="input input-bordered text-md w-10 input-sm max-w-xs"
              value={currentPage}
              name="currentPage"
              onChange={(e) => handlePageChange(e)}
            />
          </span>
          <span className=" text-sm font-semibold capitalize">of</span>{" "}
          <span className="text-sm font-semibold">{numOfPage}</span>
        </div>
        <div className="flex flex-nowrap gap-1 items-center font-bold text-sm text-base-content/70">
          <span>35</span>
          <span className="text-sm">Users</span>
        </div>
        <div className="flex gap-10">
          <button
            type="button"
            className="text-base-content/70 hover:text-base-content cursor-pointer"
            onClick={handleToFirstPage}
          >
            {" "}
            <KeyboardDoubleArrowLeftIcon className="h-8 w-8" />{" "}
          </button>
          <button
            type="button"
            className="text-base-content/70 hover:text-base-content cursor-pointer"
            onClick={handlePreviousPage}
          >
            {" "}
            <KeyboardArrowLeftIcon className="h-8 w-8" />{" "}
          </button>
          <button
            type="button"
            className="text-base-content/70 hover:text-base-content cursor-pointer"
            onClick={handleNextPage}
          >
            {" "}
            <KeyboardArrowRightIcon className="h-8 w-8" />{" "}
          </button>
          <button
            type="button"
            className="text-base-content/70 hover:text-base-content cursor-pointer"
            onClick={handleToLastPage}
          >
            {" "}
            <KeyboardDoubleArrowRightIcon className="h-8 w-8" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Pagination;
