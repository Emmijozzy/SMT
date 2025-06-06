import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { Link, useParams } from "react-router-dom";
import Avartar from "../../../../shared/components/Avartar";
import getRelativeTimeString from "../../../../shared/utils/getRelativeTimeString";
import { useGetSubtasksQuery } from "../../../subtasks/subtaskApiSlice";
import { IUser } from "../../../users/userInterface";

type Props<T> = {
  data: T;
};
function TeamUserRow<T extends IUser>({ data }: Props<T>) {
  const { data: allSubtasks } = useGetSubtasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    pollingInterval: 30000,
    refetchOnReconnect: true,
  });
  // const allSubtasks = useSelector((state: RootState) => subtasksSelectors.selectAll(state));

  const { teamId } = useParams();

  const content = useMemo(() => {
    if (data) {
      const { fullName, userId, profilePicUrl: profilePic, email, createdAt: joined, del_flg: delFlg } = data;

      const userSubtasks = allSubtasks?.filter((subtask) => subtask.assignee === userId);

      const dateJoined: string | Date = new Date(joined);

      const relativeTimeString = getRelativeTimeString(dateJoined);

      const notStartedSubtasks = Array.isArray(userSubtasks)
        ? userSubtasks.filter((subtask: { status?: string }) => subtask.status === "open").length
        : 0;
      const completedSubtasks = Array.isArray(userSubtasks)
        ? userSubtasks.filter((subtask: { status?: string }) => subtask.status === "completed").length
        : 0;

      return (
        <tr
          className={`border-b-[1px] border-base-content/40 hover:bg-base-300 capitalize ${delFlg ? "opacity-30" : ""}`}
        >
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex px-2 py-1">
              <div className="mr-2">
                {profilePic ? (
                  <img
                    src={profilePic}
                    className="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl"
                    alt="user1"
                  />
                ) : (
                  <Avartar name={fullName || ""} className="w-[2.5rem] h-[2.5rem]" />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h6 className="mb-0 text-sm leading-normal text-base-content/80 capitalize">{fullName}</h6>
                <p className="mb-0 text-xs leading-tight text-base-content/50">{userId}</p>
              </div>
            </div>
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <p className="mb-0 text-xs font-semibold leading-tight text-base-content/80 capitalize">{email}</p>{" "}
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
            <p className="mb-0 text-xs font-semibold leading-tight text-base-content/80 capitalize">active</p>{" "}
            {/* *TODO - Add to status to the table */}
          </td>
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <span className="text-xs font-semibold leading-tight text-base-content/80 normal-case">
              {relativeTimeString}
            </span>
          </td>
          <td aria-label="Action" className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex justify-center items-center gap-5">
              <Link to={`../${teamId as string}/users/${userId}/view`}>
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
  }, [allSubtasks, data, teamId]);

  return content;
}
export default TeamUserRow;
