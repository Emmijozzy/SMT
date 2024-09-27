import { FaRegEdit, FaTrashRestore } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { usersSelectors } from "../userSlice";
import Avartar from "../../../shared/components/Avartar";
import getRelativeTimeString from "../../../shared/utils/getRelativeTimeString";
import { RootState } from "../../../app/store";
import { setUserId, setShowModal } from "../DeleteUser/DeleteUserSlice";

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
    const { fullName, profilePicUrl: profilePic, email, role, team, createdAt: joined, del_flg: delFlg } = user;

    const dateJoined: string | Date = new Date(joined);

    const relativeTimeString = getRelativeTimeString(dateJoined);
    content = (
      <tr className={`border-b border-base-content/80 hover:bg-base-300 capitalize ${delFlg ? "opacity-30" : ""}`}>
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
              <p className="mb-0 text-xs leading-tight text-base-content/50">{email}</p>
            </div>
          </div>
        </td>
        <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
          <p className="mb-0 text-xs font-semibold leading-tigh text-base-content/80 capitalize">
            {role.replace("_", " ")}
          </p>
          <p className="mb-0 text-xs leading-tight text-base-content/50 capitalize">{team}</p>
        </td>
        <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
          <p className="mb-0 text-xs font-semibold leading-tigh text-base-content/80 capitalize">active</p>{" "}
          {/* *TODO - Add to status to the table */}
        </td>
        <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
          <span className="text-xs font-semibold leading-tight text-base-content/80 normal-case">
            {relativeTimeString}
          </span>
        </td>
        <td aria-label="Action" className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
          <div className="flex justify-center items-center gap-5">
            <Link to={`/dash/users/${userId}/Edit`}>
              <FaRegEdit className="h-6 w-6 text-base-content/70 hover:text-warning cursor-pointer" />
            </Link>
            <Link to={`/dash/users/${userId}/view`}>
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
