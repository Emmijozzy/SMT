import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import useRole from "../users/hooks/useRole";
import { addAlert } from "../alerts/AlertSlice";

function RequireAdminRoute() {
  const isAdmin = useRole();
  const dispatch = useDispatch();
  const location = useLocation();

  let content;
  if (isAdmin === "admin") {
    content = <Outlet />;
  } else {
    console.log("access denied");
    dispatch(addAlert({ message: "Access denied", type: "error" }));
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }

  return content;
}
export default RequireAdminRoute;
