import { IUser } from "../../../../features/users/userInterface";

interface UserProfileMobileProps {
  user: Partial<IUser>;
}

export function UserProfileMobile({ user }: UserProfileMobileProps) {
  return (
    <div className="flex flex-col md:hidden mb-2">
      {user.fullName && <h6 className="h6 text-sm pb-1">{user.fullName}</h6>}
      {user.team && (
        <p className="text-[0.65rem] leading-3 text-base-content/40 uppercase font-bold">
          {user.team} <span className="text-base-content"> - {user.role}</span>
        </p>
      )}
      {user.userId && <p className="text-[0.6rem] leading-3 text-base-content/40 uppercase mb-2">{user.userId}</p>}
      <hr className="h-px bg-base-content/40" />
    </div>
  );
}
