import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getPresentUser } from "../../profile/userProfileSlice";
import { useGetUsersQuery } from "../userApiSlice";
import { setUsers } from "../userSlice";

const useMemberTable = () => {
  const managerTeam = useSelector((state: RootState) => getPresentUser(state)).team;

  const { data } = useGetUsersQuery(
    { team_like: managerTeam },
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: false,
      pollingInterval: 30000,
      refetchOnReconnect: true,
    },
  );

  const dispatch = useDispatch();
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData) {
      dispatch(setUsers(memoizedData));
    }
  }, [memoizedData, dispatch]);

  return { memoizedData };
};

export default useMemberTable;
