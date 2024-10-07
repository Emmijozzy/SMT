import { AvatarGroup } from "@mui/material";
import User from "./User";

type Props = {
  userIds?: string[];
  users?: [
    {
      user: string;
      role: "team_member" | "manager" | "admin";
      joinedAt?: Date;
    },
  ];
};

function Users({ users, userIds }: Props) {
  return (
    <AvatarGroup max={4} total={users?.length || 0} className="flex items-center -ml-20">
      {users &&
        users.length > 0 &&
        users.map((item, index) => (
          <span key={item.user}>
            <User userId={item.user} index={index} />
          </span>
        ))}
      {userIds &&
        userIds.length > 0 &&
        userIds.map((id, index) => (
          <span key={id}>
            <User userId={id} index={index} />
          </span>
        ))}
    </AvatarGroup>
  );
}

Users.defaultProps = {
  users: [],
  userIds: [],
};

export default Users;
