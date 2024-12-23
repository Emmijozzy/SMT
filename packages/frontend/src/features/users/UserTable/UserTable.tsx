/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import useUserTable from "./useUserTable";
import TableBody from "./TableBody";
import useSearchById from "./useSearchById";
import Pagination from "../components/Pagination";
import TableHead from "../components/TableHead";
import RowPerPage from "../components/RowPerPage";
import QueryUsers from "../components/QueryUsers";
import SearchUserId from "../components/SearchUserId";

function UserTable() {
  const [showFiltered, setShowFiltered] = useState(false);

  const {
    handleNextPage,
    handlePageChange,
    handlePreviousPage,
    handleRowPerPage,
    handleToFirstPage,
    handleToLastPage,
    currentPage,
    numOfPage,
    filteredUserIds,
    userIds,
    handleSubmit,
    handleChange,
    values,
    isSubmitting,
  } = useUserTable();

  // const {searchedUserId} = useFilteredQuery();

  const { searchedIds, handleSearchId } = useSearchById(userIds || [""]);

  const handleShowFiltered = () => {
    setShowFiltered((pre) => !pre);
  };

  let tableBodyContent;

  if (searchedIds && searchedIds?.length > 0) {
    tableBodyContent = searchedIds.map((userId: string) => <TableBody key={uuid()} userId={userId} />);
  } else if (filteredUserIds) {
    tableBodyContent = filteredUserIds.map((userId: string) => <TableBody key={uuid()} userId={userId} />);
  }

  return (
    <>
      <div className="container">
        <div className="w-full py-2 bg-base-200 p-2 rounded">
          <div className="flex flex-col w-full transition-all">
            <div className="flex justify-between items-center">
              <button
                type="button"
                aria-label="Open Sidebar"
                onClick={() => handleShowFiltered()}
                className="h-full flex items-center mr-3"
              >
                <ArrowDropDownIcon className={`h-14 w-14 transition ${showFiltered ? "rotate-180" : ""}`} />
              </button>
              <SearchUserId handleSearchId={handleSearchId} />
              <button
                type="button"
                className="px-2 py-2 button text-center text-base-300 transition-all bg-transparent shadow-inner shadow-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300  rounded-lg cursor-pointer ease-in bg-gradient-to-tl from-base-content from-2% to-base-300 to-98%  "
              >
                <Link to="add-new-user" className="flex items-center justify-center text-xs">
                  <AddIcon className="h-8 w-8" />
                  &nbsp;&nbsp;Add New Card
                </Link>
              </button>
            </div>
            <QueryUsers
              showFileterd={showFiltered}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="w-full" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <div className="relative flex flex-col min-w-0 break-words bg-base-200 shadow-xl shadow-base-300 rounded-2xl">
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto ps">
                <RowPerPage handleRowPerPage={handleRowPerPage} />
                <table className="items-center min-h-96 w-full mb-0 align-top border-gray-200 text-base-content">
                  <TableHead />
                  <tbody>{tableBodyContent}</tbody>
                </table>
              </div>
            </div>
            <Pagination
              currentPage={currentPage}
              numOfPage={numOfPage}
              handlePageChange={handlePageChange}
              handleToFirstPage={handleToFirstPage}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              handleToLastPage={handleToLastPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default UserTable;
