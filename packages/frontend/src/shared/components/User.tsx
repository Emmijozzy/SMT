import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IUser } from "../../features/users/userInterface";
import { usersSelectors } from "../../features/users/userSlice";
import Avartar from "./Avartar";

type Props = {
  userId: string;
  index: number;
};

function User({ userId, index }: Props) {
  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userId)) as IUser;
  let content;
  if (user) {
    const { fullName, profilePicUrl: img } = user;
    content = (
      <Avartar
        name={fullName || ""}
        imgUrl={img}
        className={`w-[2.6rem] h-[2.6rem] rounded-full border-2 border-blueGray-50 shadow ${index === 0 ? "" : "-ml-4"}`}
      />
    );
  }

  return content;
}

export default User;
