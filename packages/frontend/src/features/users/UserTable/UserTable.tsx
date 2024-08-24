/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable indent */
import { useState } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import useUserTable from "./useUserTable";
import TableBody from "./TableBody";
import InputField2 from "../../../shared/components/InputField2";
import useSearchById from "./useSearchById";

function UserTable() {
  const [showFileterd, setShowFiltered] = useState(false);

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

  const { searchId, searchedIds, handleSearchId } = useSearchById(userIds || [""]);

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
                <ArrowDropDownIcon className={`h-14 w-14 transition ${showFileterd ? "rotate-180" : ""}`} />
              </button>
              <div className="div relative w-2/4 hidden md:inline">
                <button type="button" className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="search"
                    className="w-5 h-5 text-gray-700"
                  >
                    <path
                      d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                      stroke="currentColor"
                      strokeWidth="1.333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <input
                  className="w-full input rounded-lg px-8 py-4 border-2 border-transparent focus:outline-none focus:border-primary/50 placeholder-gray-400 transition-all duration-300 shadow-md"
                  placeholder="Search User ID ...."
                  value={searchId}
                  type="text"
                  onChange={(e) => handleSearchId(e)}
                />
                <button type="button" aria-label="reset" className="absolute right-3 -translate-y-1/2 top-1/2 p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className="px-2 py-2 button text-center text-base-300 transition-all bg-transparent shadow-inner shadow-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300  rounded-lg cursor-pointer ease-in bg-gradient-to-tl from-base-content from-2% to-base-300 to-98%  "
              >
                <Link to="/dash/users/add-new-user" className="flex items-center justify-center text-xs">
                  <AddIcon className="h-8 w-8" />
                  &nbsp;&nbsp;Add New Card
                </Link>
              </button>
            </div>
            <div className={`w-full transition ${showFileterd ? "" : "hidden"}`}>
              <form onSubmit={handleSubmit}>
                <InputField2
                  label="Fullname"
                  placeholder="Enter name"
                  onChange={handleChange}
                  value={values.fullName}
                  name="fullName"
                />
                <InputField2
                  label="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                />
                <InputField2
                  label="Status"
                  placeholder="Enter your firstname"
                  onChange={handleChange}
                  value={values.status}
                  name="email"
                />
                <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
                  <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content items-center">
                    <span className="font-bold">Role: </span>
                    <select
                      name="role"
                      id="role"
                      className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      defaultValue=""
                    >
                      <option value="">Select user role</option>
                      <option value="team_member">Team Member</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content items-center">
                    <span className="font-bold">Dept.: </span>
                    <select
                      className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none"
                      name="team"
                      id="team"
                      onChange={handleChange}
                      // onBlur={handleBlur}
                      defaultValue=""
                    >
                      <option value="">Select user Department</option>
                      <option value="developer">Developer</option>
                      <option value="ui/ux">UI/UX</option>
                      <option value="data analysit">Data Analysit</option>
                    </select>
                  </div>
                </div>
                <div className="w-full flex mt-4 justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
                    // onClick={handleFormValidation}
                  >
                    {isSubmitting ? "Loading..." : "Search"}
                  </button>
                </div>
              </form>
            </div>
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
                  <tbody>{tableBodyContent}</tbody>
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
