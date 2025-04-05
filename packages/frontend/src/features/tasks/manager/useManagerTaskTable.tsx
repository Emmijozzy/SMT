import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { getPresentUser } from "../../profile/userProfileSlice";
import { useGetTasksQuery } from "../tasksApiSlice";
import { setTasks } from "../tasksSlice";

export default function useManagerTaskTable() {
  const managerTeamId = useSelector((state: RootState) => getPresentUser(state))?.teamId;

  const { data, isLoading, isSuccess, isError, error } = useGetTasksQuery(
    {
      responsibleTeam_like: managerTeamId,
    } as unknown as void,
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    },
  );

  const dispatch = useDispatch();

  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData) {
      dispatch(setTasks(memoizedData));
    }
  }, [memoizedData, dispatch]);

  return {
    isError,
    isLoading,
    isSuccess,
    error,
  };
}
