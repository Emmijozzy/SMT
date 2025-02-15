/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addAlert } from "../../../alerts/AlertSlice";
import { useGetSubtaskAuditLogsQuery } from "../../subtaskApiSlice";
import { SubtaskLog } from "../../subtaskInterface";

function useSubtaskAuditLog() {
  const [auditLog, setAuditLog] = useState<SubtaskLog[]>([]);
  const { subtaskId } = useParams<{ subtaskId: string }>();
  const dispatch = useDispatch();

  const { data, isError, isSuccess } = useGetSubtaskAuditLogsQuery(subtaskId ?? "", {
    pollingInterval: 15000, // Refresh every 15 seconds
    refetchOnMountOrArgChange: true, // Force refetch on mount
    refetchOnFocus: true, // Refetch when window regains focus
  });

  const resData = data;

  useEffect(() => {
    if (isSuccess && resData?.data) {
      setAuditLog(
        Array.isArray(resData?.data) ? resData?.data : [resData?.data].filter((log): log is SubtaskLog => "id" in log),
      );
    } else if (isError) {
      dispatch(addAlert({ message: "Failed to fetch audit logs", type: "error" }));
    }
  }, [data, dispatch, isError, isSuccess, resData]);
  return { auditLog };
}

export default useSubtaskAuditLog;
