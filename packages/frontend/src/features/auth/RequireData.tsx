import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getPresentStatus } from "../../shared/Slice/statusSlice";
import Loader from "../../shared/components/Loader";

function RequireData() {
  const status = useSelector(getPresentStatus);
  const location = useLocation();
  console.log("req-data", status);

  let content;
  if (status === "loading" || status === "") {
    content = <Loader />;
  } else if (status === "success") {
    console.log("Success dtat");
    content = <Outlet />;
  } else if (status === "error") {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
}
export default RequireData;
