/* eslint-disable indent */
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import useUserTable from "./useUserTable";
import TableBody from "./TableBody";

function UserTable() {
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
  } = useUserTable();

  return (
    <>
      <div className="container">
        <div className="w-full py-2">
          <div className="flex justify-between items-center">
            <select
              // value={theme}
              // onChange={handleThemeselect}
              className="select select-bordered rounded-lg select-md max-w-xs h-[0.5rem] mt-1"
            >
              <option value="All">All</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cupcake">Cupcake</option>
              <option value="retro">Retro</option>
              <option value="synthwave">Synthwave</option>
            </select>
            <button
              type="button"
              className="px-4 py-2 ml-auto button text-center text-base-300 transition-all bg-transparent shadow-inner shadow-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300  rounded-lg cursor-pointer ease-in bg-gradient-to-tl from-base-content from-2% to-base-300 to-98%  "
            >
              <Link to="/dash/users/add-new-user" className="flex items-center justify-center">
                <AddIcon className="h-8 w-8" />
                &nbsp;&nbsp;Add New Card
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="w-full" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <div className="relative flex flex-col min-w-0 break-words bg-base-200 shadow-xl shadow-base-300 rounded-2xl">
            <div className="flex-auto px-0 pt-0 pb-2">
              <div className="p-0 overflow-x-auto ps">
                <div className="h-12 w-full flex items-center justify-between px-6">
                  <div className="text-base-content/70 text-md">
                    <span className="text-md pr-1">Rows Per page: </span>
                    <select
                      name="show"
                      id="select-show"
                      className="select select-bordered select-xs text-md " /* onChange={handleChange} */
                      onChange={(e) => handleRowPerPage(e)}
                      defaultValue={5}
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                    </select>
                  </div>
                </div>
                <table className="items-center w-full mb-0 align-top border-gray-200 text-base-content">
                  <thead className="align-bottom">
                    <tr className="border-b border-base-content/80 ">
                      <th className="px-6 py-3 font-bold text-left uppercase align-middle text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70 ">
                        Details
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent shadow-none text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70">
                        Function
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent shadow-none text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70">
                        Status
                      </th>
                      <th className="px-6 py-3 pl-2 font-bold text-left uppercase bg-transparent shadow-none text-md border-b-solid tracking-none whitespace-nowrap text-base-content/70">
                        Joined
                      </th>
                      <th className="px-6 py-3 font-semibold uppercase align-middle bg-transparent border-solid shadow-none tracking-none whitespace-nowrap text-base-content/70">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUserIds
                      ? filteredUserIds.map((userId: string) => <TableBody key={uuid()} userId={userId} />)
                      : undefined}
                  </tbody>
                </table>
                <div className="flex justify-end gap-32 pt-4 px-2">
                  <div className="flex flex-nowrap gap-2 items-center font-bold text-md text-base-content/70">
                    <span className="text-md font-semibold capitalize">
                      Page{" "}
                      <input
                        className="input input-bordered text-md w-10 input-sm mx-1  max-w-xs"
                        value={currentPage}
                        name="currentPage"
                        onChange={(e) => handlePageChange(e)}
                      />
                    </span>
                    <span className=" text-md font-semibold capitalize">of</span>{" "}
                    <span className="text-md font-semibold">{numOfPage}</span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserTable;
