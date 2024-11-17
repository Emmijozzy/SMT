import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { store } from "../../app/store";
import { clearStatus } from "../../shared/Slice/statusSlice";
import { addAlert, clearAlert } from "../alerts/AlertSlice";
import { tasksApiSlice } from "../tasks/tasksApiSlice";
import { teamApiSlice } from "../teams/teamApiSlice";
import useRole from "../users/hooks/useRole";
import { userApiSlice } from "../users/userApiSlice";
import log from "../../shared/utils/log";

function RequireAdminRoute() {
  const isAdmin = useRole() === "admin";
  const dispatch = useDispatch();
  const location = useLocation();

  log("info", "Admin routes", "RequireAdminRoute");

  useEffect(() => {
    dispatch(clearStatus());
    dispatch(clearAlert());

    store.dispatch(userApiSlice.util.prefetch("getUsers", undefined, { force: true }));
    store.dispatch(tasksApiSlice.util.prefetch("getTasks", undefined, { force: true }));
    store.dispatch(teamApiSlice.util.prefetch("getTeams", undefined, { force: true }));
  }, [dispatch]);

  let content;
  if (isAdmin) {
    content = <Outlet />;
  } else {
    dispatch(addAlert({ message: "Admin page access denied", type: "error" }));
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
}
export default RequireAdminRoute;
