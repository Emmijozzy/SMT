import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { store } from "../../app/store";
import { clearStatus } from "../../shared/Slice/statusSlice";
import { addAlert, clearAlert } from "../alerts/AlertSlice";
import useRole from "../users/hooks/useRole";
import log from "../../shared/utils/log";
// import { userApiSlice } from "../users/userApiSlice";

function RequireManagerRoute() {
  const isManager = useRole() === "manager";
  const dispatch = useDispatch();
  const location = useLocation();

  log("info", "RequireManagerRoute", "isManager");

  useEffect(() => {
    dispatch(clearStatus());
    dispatch(clearAlert());

    // store.dispatch(userApiSlice.util.prefetch("getUserProfile", "user", { force: true }));
  }, [dispatch]);

  let content;
  if (isManager) {
    content = <Outlet />;
  } else {
    dispatch(addAlert({ message: "Manager's page access denied", type: "error" }));
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
}
export default RequireManagerRoute;
