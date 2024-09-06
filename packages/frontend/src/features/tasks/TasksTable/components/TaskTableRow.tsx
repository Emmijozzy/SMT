/* eslint-disable jsx-a11y/control-has-associated-label */
import { AvatarGroup } from "@mui/material";
import { CiMenuKebab } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import Avartar from "../../../../shared/components/Avartar";
import Completion from "./Completion";
import PriorityIndicator from "./PriorityIndicator";
import { RootState } from "../../../../app/store";
import { tasksSelectors } from "../../tasksSlice";
import { ITask } from "../../tasksInterface";
import getDaysLeft from "../../../../shared/utils/getDaysLeft";

type Props = {
  taskId: string;
};

function TaskTableRow({ taskId }: Props) {
  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId)) as ITask;

  const content = useMemo(() => {
    if (getTask) {
      const { title, responsibleTeam, priority, status, assignedTo, dueDate } = getTask;
      const daysLeft = getDaysLeft(dueDate || new Date().toDateString());
      return (
        <tr className="relative">
          <td className="border-t-0 w-64 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <Avartar name={title} imgUrl="" />
            <span className="ml-3 font-bold truncate ... text-base-content capitalize hover:overflow-visible hover:bg-base-100">
              {title}
            </span>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
            <span>{responsibleTeam}</span>
          </td>
          <td className="border-t-0 w-12 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize ">
            <div className="flex items-center gap-1">
              <PriorityIndicator priority={priority} />
              {priority}
            </div>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
            <div>
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 inline-block" />
              {status}
            </div>
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <div className="flex w-28">
              <AvatarGroup max={4} total={assignedTo?.length || 0}>
                {assignedTo &&
                  assignedTo.map((img, index) => (
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
            <Completion completion={60} />
          </td>
          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <span>{daysLeft}</span>
          </td>
          <td className="border-t-0 max-w-20 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
            <div className="dropdown dropdown-hover dropdown-left ">
              <div tabIndex={0} role="button" className="btn m-1">
                <CiMenuKebab className="h-4 w-4 text-base-content" />
              </div>
              <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
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
      );
    }
    return null; // Return null if task is not available
  }, [getTask]); // Only re-calculate when task changes

  return (
    content || (
      <tr>
        <td className="text-center">
          <span>...Loading</span>
        </td>
      </tr>
    )
  );
}

export default TaskTableRow;
