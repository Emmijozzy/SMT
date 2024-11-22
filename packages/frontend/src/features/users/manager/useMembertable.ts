import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getPresentUser } from "../../profile/userProfileSlice";
import { useGetUsersQuery } from "../userApiSlice";
import { setUsers } from "../userSlice";

const useMemberTable = () => {
  const managerTeam = useSelector((state: RootState) => getPresentUser(state)).team;

  const { data } = useGetUsersQuery({ team_like: managerTeam });

  const dispatch = useDispatch();
  const memoizedData = useMemo(() => data, [data]);

  console.log(data);

  useEffect(() => {
    if (memoizedData) {
      dispatch(setUsers(memoizedData));
    }
  }, [memoizedData, dispatch]);

  return { memoizedData };
};

export default useMemberTable;
