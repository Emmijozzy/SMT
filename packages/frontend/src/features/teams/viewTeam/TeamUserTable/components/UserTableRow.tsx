import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import Avartar from "../../../../../shared/components/Avartar";
import { usersSelectors } from "../../../../users/userSlice";

type Props = {
  userData: {
    user: string;
    role: "team_member" | "manager" | "admin";
    joinedAt?: Date;
  };
};

const UserTableRow = ({ userData }: Props) => {
  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userData.user));
  let content;
  if (user) {
    const { userId, fullName, role, profilePicUrl } = user;
    const dateJoined = userData.joinedAt?.toString().split("T")[0];
    content = (
      <tr>
        <td className="">
          <div className="flex items-center gap-2 px-4 py-1 text-sm text-base-content/80">
            <Avartar imgUrl={profilePicUrl || ""} name={fullName as string} />
            <p>{fullName}</p>
          </div>
        </td>
        <td className="">
          <p className="px-4 py-2 text-sm text-left text-base-content/80 capitalize">{userId}</p>
        </td>
        <td className="px-4 py-2 text-sm text-base-content/80 capitalize">
          <p>{role.replace("_", " ")}</p>
        </td>
        <td className="px-4 py-2 text-sm text-base-content/80 capitalize">
          <p>{dateJoined}</p>
        </td>
      </tr>
    );
  }
  return content;
};

export default UserTableRow;
