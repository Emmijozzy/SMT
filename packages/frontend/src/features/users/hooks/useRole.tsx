import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const useRole = (): string | null | undefined => {
  const role = useSelector((state: RootState) => state.userProfile.userProfile.role);
  return role;
};

export default useRole;
