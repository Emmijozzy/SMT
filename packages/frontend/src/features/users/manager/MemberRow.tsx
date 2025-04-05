/* eslint-disable no-nested-ternary */
import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import User from "../../../shared/components/User";
import getRelativeTimeString from "../../../shared/utils/getRelativeTimeString";
import { IUser } from "../userInterface";

type Props<T> = {
  data: T;
};
function MemberRow<T extends IUser>({ data }: Props<T>) {
  const content = useMemo(() => {
    if (data) {
      const { fullName, userId, email, createdAt: joined, del_flg: delFlg, subtasks, status } = data;

      const dateJoined: string | Date = new Date(joined);

      const relativeTimeString = getRelativeTimeString(dateJoined);

      const notStartedSubtasks = Array.isArray(subtasks)
        ? subtasks.filter((subtask: { status?: string }) => subtask.status === "open").length
        : 0;
      const completedSubtasks = Array.isArray(subtasks)
        ? subtasks.filter((subtask: { status?: string }) => subtask.status === "completed").length
        : 0;

      return (
        <tr
          className={`border-b-[1px] border-base-content/40 hover:bg-base-300 capitalize ${delFlg ? "opacity-30" : ""}`}
        >
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex px-2 py-1">
              <div className="mr-2">
                <User userId={userId} index={0} avaterClassName="w-[3rem] h-[3rem] text-xl" />
              </div>
              <div className="flex flex-col justify-center">
                <h6 className="mb-0 text-sm leading-normal text-base-content/80 capitalize">{fullName}</h6>
                <p className="mb-0 text-xs leading-tight text-base-content/50">{userId}</p>
              </div>
            </div>
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <p className="mb-0 text-xs font-semibold leading-tight text-base-content/80 capitalize">{email}</p>
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <p className="mb-0 text-xs font-semibold text-center leading-tight text-base-content/80 capitalize">
              {notStartedSubtasks}
            </p>
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <p className="mb-0 text-xs font-semibold text-center  leading-tight text-base-content/80 capitalize">
              {completedSubtasks}
            </p>
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full mr-2 ${status === "online" ? "bg-success" : status === "offline" ? "bg-error" : "bg-warning"}`}
              />
              <p
                className={`mb-0 text-xs font-semibold leading-tight capitalize ${status === "online" ? "text-success" : status === "offline" ? "text-error" : "text-warning"}`}
              >
                {status || "unknown"}
              </p>
            </div>
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <span className="text-xs font-semibold leading-tight text-base-content/80 normal-case">
              {relativeTimeString}
            </span>
          </td>
          <td aria-label="Action" className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex justify-center items-center gap-5">
              <Link to={`./${userId}/view`}>
                <GrView className="h-6 w-6 text-base-content/70 hover:text-info cursor-pointer" />
              </Link>
            </div>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td className="text-center">
          <span>...Loading</span>
        </td>
      </tr>
    );
  }, [data]);

  return content;
}
export default MemberRow;
