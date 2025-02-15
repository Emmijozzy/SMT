import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import Avartar from "../../../shared/components/Avartar";
import { usersSelectors } from "../../users/userSlice";

type Props = {
  assignee: string;
};

function Assignee({ assignee }: Props) {
  console.log(assignee);
  const user = useSelector((state: RootState) => usersSelectors.selectById(state, assignee));

  console.log(user);

  if (!user) return null;

  return (
    <div className="-ml-2 text-left flex items-center">
      <Avartar name={user.fullName as string} imgUrl={user.profilePicUrl} />
      <div>
        <span className="ml-3 font-bold truncate ... text-base-content capitalize hover:overflow-visible hover:bg-base-100">
          {user.fullName}
        </span>
        <p className="ml-3 text-xs leading-tight text-base-content/50">{user.userId}</p>
      </div>
    </div>
  );
}

export default Assignee;
