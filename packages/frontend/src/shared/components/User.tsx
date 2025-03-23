import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useGetUserQuery } from "../../features/users/userApiSlice";
import { IUser } from "../../features/users/userInterface";
import { usersSelectors } from "../../features/users/userSlice";
import Avartar from "./Avartar";

type Props = {
  userId: string;
  index: number;
  withName?: boolean;
  avaterClassName?: string;
  className?: string;
};

function User({ userId, index, withName = false, avaterClassName = "", className = "" }: Props) {
  const { data: loadedUser, isFetching, isSuccess } = useGetUserQuery(userId);
  let user = useSelector((state: RootState) => usersSelectors.selectById(state, userId)) as IUser;

  if (!user && isSuccess) {
    user = loadedUser;
  }

  let content;
  if (user) {
    const { fullName, profilePicUrl: img } = user;
    content = (
      <div className={`flex items-center ${className}`}>
        <Avartar
          name={fullName || ""}
          imgUrl={img}
          className={`w-[2rem] h-[2rem] rounded-full text-sm font-bold border-2 border-blueGray-50 shadow ${index === 0 ? "" : "-ml-4"} ${avaterClassName}`}
        />
        {withName && <span className="ml-2 capitalize">{fullName}</span>}
      </div>
    );
  } else if (isFetching) {
    content = (
      <div className="w-[2rem] h-[2rem] rounded-full border-2 border-blueGray-50 shadow animate-pulse bg-blueGray-50" />
    );
  }

  return content;
}

export default User;
