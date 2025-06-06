/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { AvatarGroup } from "@mui/material";
import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import Avartar from "../../../../shared/components/Avartar";
import PriorityIndicator from "../../../../shared/components/PriorityIndicator";
import getDaysLeft from "../../../../shared/utils/getDaysLeft";
import { ITask } from "../../tasksInterface";
import Completion from "./Completion";

type Props<T> = {
  data: T;
};

function TaskTableRow<T extends ITask>({ data }: Props<T>) {
  const content = useMemo(() => {
    if (data) {
      const { title, taskId, responsibleTeam, priority, status, assignedTo, dueDate, del_flg: delFlg, progress } = data;
      const daysLeft = getDaysLeft(dueDate || new Date().toDateString());
      return (
        <tr className={`relative hover:bg-base-100 ${delFlg ? "opacity-20" : ""}`}>
          <td className="border-t-0 max-w-72 align-middle border-l-0 border-r-0 text-xs whitespace-normal px-2 pt-2 text-left flex items-center">
            <Avartar name={title} imgUrl="" />
            <div className="max-w-[250px]">
              <p className="ml-3 font-bold text-base-content capitalize break-words truncate hover:text-clip hover:whitespace-normal active:text-clip active:whitespace-normal">
                {title}
              </p>
              <p className="ml-3 text-xs leading-tight text-base-content/50">{taskId}</p>
            </div>
          </td>
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <span>
              {typeof responsibleTeam === "string" ? (
                responsibleTeam
              ) : (responsibleTeam as { name: string }).name ? (
                (responsibleTeam as { name: string }).name
              ) : (
                <span className="text-base-content/50">No Team</span>
              )}
            </span>
          </td>
          <td className="border-t-0 w-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize ">
            <div className="flex items-center gap-1">
              <PriorityIndicator priority={priority} />
              {priority}
            </div>
          </td>
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize">
            <div>
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 inline-block" />
              {status}
            </div>
          </td>
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <div className="flex w-28">
              <AvatarGroup max={4} total={assignedTo?.length || 0}>
                {assignedTo &&
                  assignedTo.map(
                    (user, index) =>
                      typeof user === "object" && (
                        <span key={user.fullName}>
                          <Avartar
                            name={user.fullName}
                            imgUrl={user.profilePicUrl}
                            className={`w-[2.6rem] h-[2.6rem] rounded-full border-2 border-blueGray-50 shadow ${index === 0 ? "" : "-ml-4"}`}
                          />
                        </span>
                      ),
                  )}
              </AvatarGroup>
            </div>
          </td>
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <Completion completion={progress || 0} />
          </td>
          <td className="max-w-32 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <span>{daysLeft}</span>
          </td>
          <td className="border-t-0 max-w-20 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 text-right">
            <Link to={`${taskId as string}`} className="flex view justify-between ">
              <GrView className="h-6 w-6 text-base-content/70 hover:text-secondary cursor-pointer" />
            </Link>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td colSpan={8} className="text-center">
          <span>...Loading</span>
        </td>
      </tr>
    );
  }, [data]);
  return content;
}

export default TaskTableRow;
