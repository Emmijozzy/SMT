import { IUser } from "../../../../features/users/userInterface";
import Avartar from "../../../../shared/components/Avartar";

interface UserProfileProps {
  user: Partial<IUser>;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <>
      <div className="ml-1">{user.fullName && <Avartar name={user.fullName} />}</div>
      <div className="ml-1 hidden md:flex flex-col">
        {user.fullName && <h6 className="h6 text-sm">{user.fullName}</h6>}
        {user.team && (
          <p className="text-[0.65rem] leading-3 text-base-content/40 uppercase font-bold">
            {user.team} <span className="text-base-content"> - {user.role}</span>
          </p>
        )}
        {user.userId && <p className="text-[0.6rem] leading-3 text-base-content/40 uppercase">{user.userId}</p>}
      </div>
    </>
  );
}
