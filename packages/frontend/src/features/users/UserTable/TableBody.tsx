/* eslint-disable no-nested-ternary */
import { FaRegEdit, FaTrashRestore } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import getRelativeTimeString from "../../../shared/utils/getRelativeTimeString";
import { setShowModal, setUserId } from "../DeleteUser/DeleteUserSlice";
import { usersSelectors } from "../userSlice";
import User from "../../../shared/components/User";

type Props = {
  userId: string;
};
function TableBody({ userId }: Props) {
  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userId));
  // console.log(user);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setUserId({ userId, forDelete: true }));
    dispatch(setShowModal());
  };

  const handleRestore = () => {
    dispatch(setUserId({ userId, forDelete: false }));
    dispatch(setShowModal());
  };

  let content;

  if (user) {
    const { fullName, email, role, team, createdAt: joined, del_flg: delFlg, status } = user;

    const dateJoined: string | Date = new Date(joined);

    const relativeTimeString = getRelativeTimeString(dateJoined);
    content = (
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
          <p className="mb-0 text-xs font-semibold leading-tight text-base-content/80 capitalize">{email}</p>{" "}
          {/* *TODO - Add to status to the table */}
        </td>
        <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
          <p className="mb-0 text-xs font-semibold leading-tight text-base-content/80 capitalize">
            {role.replace("_", " ")}
          </p>
          <p className="mb-0 text-xs leading-tight text-base-content/50 capitalize">{team}</p>
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
            <Link to={`${userId}/Edit`}>
              <FaRegEdit className="h-6 w-6 text-base-content/70 hover:text-warning cursor-pointer" />
            </Link>
            <Link to={`${userId}/view`}>
              <GrView className="h-6 w-6 text-base-content/70 hover:text-info cursor-pointer" />
            </Link>
            {delFlg ? (
              <button type="button" aria-label="delete user" className="outline-none" onClick={handleRestore}>
                <FaTrashRestore className="h-6 w-6 text-base-content/70 hover:text-error cursor-pointer" />
              </button>
            ) : (
              <button type="button" aria-label="delete user" className="outline-none" onClick={handleDelete}>
                <RiDeleteBin6Line className="h-6 w-6 text-base-content/70 hover:text-error cursor-pointer" />
              </button>
            )}
          </div>
        </td>
      </tr>
    );
  } else {
    content = null;
  }
  return content;
}
export default TableBody;
