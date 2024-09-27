/* eslint-disable jsx-a11y/control-has-associated-label */
import { AvatarGroup } from "@mui/material";
import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../app/store";
import Avartar from "../../../../shared/components/Avartar";
import getDaysLeft from "../../../../shared/utils/getDaysLeft";
import { ITask } from "../../tasksInterface";
import { tasksSelectors } from "../../tasksSlice";
import Completion from "./Completion";
import PriorityIndicator from "./PriorityIndicator";

type Props = {
  taskId: string;
};

function TaskTableRow({ taskId }: Props) {
  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId)) as ITask;

  const content = useMemo(() => {
    if (getTask) {
      const { title, responsibleTeam, priority, status, assignedTo, dueDate, del_flg: delFlg } = getTask;
      const daysLeft = getDaysLeft(dueDate || new Date().toDateString());
      return (
        <tr className={`relative hover:bg-base-100 ${delFlg ? "opacity-20" : ""}`}>
          <td className="border-t-0 w-64 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 text-left flex items-center">
            <Avartar name={title} imgUrl="" />
            <span className="ml-3 font-bold truncate ... text-base-content capitalize hover:overflow-visible hover:bg-base-100">
              {title}
            </span>
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize">
            <span>{responsibleTeam}</span>
          </td>
          <td className="border-t-0 w-12 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize ">
            <div className="flex items-center gap-1">
              <PriorityIndicator priority={priority} />
              {priority}
            </div>
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize">
            <div>
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 inline-block" />
              {status}
            </div>
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
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
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <Completion completion={60} />
          </td>
          <td className="max-w-32 border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <span>{daysLeft}</span>
          </td>
          <td className="border-t-0 max-w-20 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 text-right">
            <Link to={`${taskId}`} className="flex view justify-between ">
              <GrView className="h-6 w-6 text-base-content/70 hover:text-secondary cursor-pointer" />
            </Link>
          </td>
        </tr>
      );
    }
    return null; // Return null if task is not available
  }, [getTask, taskId]); // Only re-calculate when task changes

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
