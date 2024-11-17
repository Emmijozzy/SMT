import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { clearStatus } from "../../shared/Slice/statusSlice";
import log from "../../shared/utils/log";
import { addAlert, clearAlert } from "../alerts/AlertSlice";
import useRole from "../users/hooks/useRole";

function RequireMemberRoute() {
  const isMember = useRole() === "team_member";
  const dispatch = useDispatch();
  const location = useLocation();

  log("info", "RequireMemberRoute", "Member route");

  useEffect(() => {
    dispatch(clearStatus());
    dispatch(clearAlert());

    // store.dispatch(userApiSlice.util.prefetch("getUserProfile", "user", { force: true }));
  }, [dispatch]);

  let content;
  if (isMember) {
    content = <Outlet />;
  } else {
    dispatch(addAlert({ message: "member's page access denied", type: "error" }));
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
}
export default RequireMemberRoute;
