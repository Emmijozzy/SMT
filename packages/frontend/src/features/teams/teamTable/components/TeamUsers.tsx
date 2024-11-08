import { AvatarGroup } from "@mui/material";
import { IUser } from "../../../users/userInterface";
import Avartar from "../../../../shared/components/Avartar";

type Props = {
  users: IUser[];
};

function TeamUsers({ users }: Props) {
  return (
    <AvatarGroup max={4} total={users?.length || 0} className="flex items-center -ml-20">
      {users &&
        users.length > 0 &&
        users.map((user, index) => (
          <span key={user.userId}>
            <Avartar
              name={user.fullName as string}
              imgUrl={user.profilePicUrl}
              className={`w-[2.6rem] h-[2.6rem] rounded-full border-2 border-blueGray-50 shadow ${index === 0 ? "" : "-ml-4"}`}
            />
          </span>
        ))}
    </AvatarGroup>
  );
}

export default TeamUsers;
