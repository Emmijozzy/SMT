import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { usersSelectors } from "../userSlice";

const useUserName = (userId: string): string | null | undefined => {
  const fullname = useSelector((state: RootState) => usersSelectors.selectById(state, userId)?.fullName);
  return fullname;
};

export default useUserName;
