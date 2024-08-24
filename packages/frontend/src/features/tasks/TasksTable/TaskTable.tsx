/* eslint-disable jsx-a11y/control-has-associated-label */
import { AvatarGroup } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit, FaTrashRestore } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import tasks from "../../../constans/tasks";
import Avartar from "../../../shared/components/Avartar";
import Completion from "./components/Completion";
import TableHead from "./components/TableHead";
import PriorityIndicator from "./components/PriorityIndicator";
import Pagination from "./components/Pagination";
import { setTotalRows } from "./tasksTableSlice";
import { RootState } from "../../../app/store";
import InputField2 from "../../../shared/components/InputField2";

// type Props = {};
function TasksTable() {
  const [showFileterd, setShowFiltered] = useState(false);
  const [totalTasks, setTotalTask] = useState(tasks);
  const [filteredTask, setFilteredTask] = useState<typeof totalTasks>();

  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.taskTable.pagination.currentPage);
  const rowsPerPage = useSelector((state: RootState) => state.taskTable.pagination.rowsPerPage);

  const filterTask = () => {
    const firstRoleTask = rowsPerPage * currentPage - rowsPerPage;
    const lastRoleTask = firstRoleTask + rowsPerPage;

    console.log(firstRoleTask, lastRoleTask);

    return totalTasks.slice(firstRoleTask, lastRoleTask);
  };

  useEffect(() => {
    setFilteredTask(filterTask);
  }, [currentPage, rowsPerPage, totalTasks]);

  const handleShowFiltered = () => {
    setShowFiltered((pre) => !pre);
  };

  // const filteredTask = filterTask();

  dispatch(setTotalRows(totalTasks.length));

  return (
    <>
      <div className="container">
        <div className="w-full p-2 bg-base-200 rounded">
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
                  placeholder="Search Task ID ...."
                  // value={searchId}
                  type="text"
                  // onChange={(e) => handleSearchId(e)}
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
                  &nbsp;&nbsp;Add New Task
                </Link>
              </button>
            </div>
            <div className={`w-full transition ${showFileterd ? "" : "hidden"}`}>
              <form /* onSubmit={handleSubmit} */>
                <InputField2
                  label="Fullname"
                  placeholder="Enter name"
                  // onChange={handleChange}
                  // value={values.fullName}
                  name="fullName"
                />
                <InputField2
                  label="email"
                  placeholder="Enter email"
                  // onChange={handleChange}
                  // value={values.email}
                  name="email"
                />
                <InputField2
                  label="Status"
                  placeholder="Enter your firstname"
                  // onChange={handleChange}
                  // value={values.status}
                  name="email"
                />
                <div className=" w-full mt-4 flex flex-wrap gap-2 justify-between">
                  <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content items-center">
                    <span className="font-bold">Status: </span>
                    <select
                      name="role"
                      id="role"
                      className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      defaultValue=""
                    >
                      <option value="">Select task status</option>
                      <option value="not started">not started</option>
                      <option value="in process">in process</option>
                      <option value="completed">completed</option>
                      <option value="close">close</option>
                    </select>
                  </div>
                  <div className="w-full md:w-[45%] flex text-lg border-b-2 border-base-content items-center">
                    <span className="font-bold">Priority: </span>
                    <select
                      className="relative select select-secondary text-lg w-full max-w-xs capitalize border-0 rounded-none focus:border-0 focus:outline-none mx-2 rounded-t"
                      name="team"
                      id="team"
                      // onChange={handleChange}
                      // onBlur={handleBlur}
                      defaultValue=""
                    >
                      <option value="">Select Task priority</option>
                      <option value="high">High</option>
                      <option value="medium">medium</option>
                      <option value="low">low</option>
                    </select>
                  </div>
                </div>
                <div className="w-full flex mt-4 justify-center">
                  <button
                    type="submit"
                    className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
                    // onClick={handleFormValidation}
                  >
                    {/* isSubmitting */ true ? "Loading..." : "Search"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-base-200 text-base-content/70">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 ">
                  <h3 className="font-semibold text-lg text-base-content">Tasks Tables</h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto ">
              <table className="items-center w-full bg-transparent border-collapse overflow-visible mb-6">
                <TableHead />
                <tbody className="mb-10">
                  {filteredTask &&
                    filteredTask.map((task, index) => (
                      <tr key={index} className="relative">
                        <th className="border-t-0 w-64 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                          <Avartar name={task.title} imgUrl={task.taskImg} />
                          <span className="ml-3 font-bold truncate ...  text-base-content capitalize hover:overflow-visible hover:bg-base-100">
                            {task.title}
                          </span>
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
                          {task.responsibleTeam}
                        </td>
                        <td className="border-t-0 w-12 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize ">
                          <div className="flex items-center gap-1">
                            <PriorityIndicator priority={task.priority} />
                            {task.priority}
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
                          <div className=" w-2 h-2 rounded-full bg-orange-500 mr-2 inline-block" />
                          {task.status}
                        </td>
                        <td className="border-t-0  px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex w-28">
                            <AvatarGroup max={4} total={task.assignedTo.length}>
                              {task.assignedTo.map((img, index) => (
                                <span key={img}>
                                  <Avartar
                                    name="imga hdh"
                                    imgUrl={img}
                                    className={`w-[2.6rem] h-[2.6rem] rounded-full border-2 border-blueGray-50 shadow ${index === 0 ? "" : "-ml-4"}`}
                                  />
                                </span>
                              ))}
                            </AvatarGroup>
                          </div>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <Completion completion={task.completion} />
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {task.dueDate}
                        </td>
                        {/* </td> */}
                        <td className="border-t-0 max-w-20 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                          {/* TODO -  addintion menu to befixed */}
                          {/* <button type="button">
                        </button> */}
                          <div className="dropdown dropdown-hover dropdown-left ">
                            <div tabIndex={0} role="button" className="btn m-1">
                              <CiMenuKebab className="h-4 w-4 text-base-content" />
                            </div>
                            <ul
                              // tabIndex={0}
                              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                            >
                              <li>
                                <a href="http://" className="flex view justify-between ">
                                  <span>View</span>
                                  <GrView className="h-6 w-6 text-base-content/70 hover:text-warning cursor-pointer peer-hover:text-warning" />
                                </a>
                              </li>
                              <li>
                                <a href="http://" className="flex justify-between">
                                  <span>Edit</span>
                                  <FaRegEdit className="h-6 w-6 text-base-content/70 hover:text-warning cursor-pointer" />
                                </a>
                              </li>
                              <li>
                                <a href="http://" className="flex justify-between">
                                  <span>Delete</span>
                                  <RiDeleteBin6Line className="h-6 w-6 text-base-content/70 hover:text-warning cursor-pointer" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="w-full flex justify-center items-center gap-32 py-2 px-2 border-t-2">
                <Pagination totalRows={totalTasks.length} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TasksTable;
