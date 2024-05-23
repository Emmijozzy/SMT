import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useRole from "../users/hooks/useRole";
import { addAlert } from "../alerts/AlertSlice";

function RequireAdminRoute() {
  const isAdmin = useRole() === "admin";
  const dispatch = useDispatch();
  const location = useLocation();

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
