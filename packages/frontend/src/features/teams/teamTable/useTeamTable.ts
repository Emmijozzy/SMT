import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useGetTeamsQuery } from "../teamApiSlice";
import { setTeams, teamSelectors } from "../teamSlice";
import { setTotalRows } from "./teamTableSlice";

const useTeamTable = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetTeamsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  const [totalTeam, setTotalTeam] = useState<string[]>();
  // const [searchTeam, setSearchTeam] = useState<string>();

  const dispatch = useDispatch();
  const memoizedData = useMemo(() => data, [data]);

  useEffect(() => {
    if (memoizedData) {
      dispatch(setTeams(memoizedData));
      dispatch(setTotalRows(memoizedData.length));
    }
  }, [memoizedData, dispatch]);

  const totalTeamIds = useSelector((state: RootState) => teamSelectors.selectIds(state));

  useEffect(() => {
    setTotalTeam(totalTeamIds);
  }, [totalTeamIds]);

  const currentPage = useSelector((state: RootState) => state.teamTable.pagination.currentPage);
  const rowsPerPage = useSelector((state: RootState) => state.teamTable.pagination.rowsPerPage);

  const filteredTeam = useMemo(() => {
    const firstRoleTeam = rowsPerPage * currentPage - rowsPerPage;
    const lastRoleTeam = firstRoleTeam + rowsPerPage;
    return totalTeam?.slice(firstRoleTeam, lastRoleTeam);
  }, [totalTeam, currentPage, rowsPerPage]);

  return {
    filteredTeam,
    totalTeam,
    isError,
    isLoading,
    isSuccess,
    error,
  };
};
export default useTeamTable;
