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
import QueryTask from "./components/QueryTask";

// type Props = {};
function TasksTable() {
  const [totalTasks, setTotalTask] = useState(tasks);
  const [filteredTask, setFilteredTask] = useState<typeof totalTasks>();

  const dispatch = useDispatch();
  const currentPage = useSelector((state: RootState) => state.taskTable.pagination.currentPage);
  const rowsPerPage = useSelector((state: RootState) => state.taskTable.pagination.rowsPerPage);

  const filterTask = () => {
    const firstRoleTask = rowsPerPage * currentPage - rowsPerPage;
    const lastRoleTask = firstRoleTask + rowsPerPage;
    return totalTasks.slice(firstRoleTask, lastRoleTask);
  };

  useEffect(() => {
    setFilteredTask(filterTask);
  }, [currentPage, rowsPerPage, totalTasks]);

  // const filteredTask = filterTask();

  dispatch(setTotalRows(totalTasks.length));

  return (
    <>
      <QueryTask />
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
