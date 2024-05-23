import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getPresentStatus } from "../../shared/Slice/statusSlice";

function RequireData() {
  const status = useSelector(getPresentStatus);
  const location = useLocation();
  console.log("req-data", status);

  let content;
  if (status === "loading" || status === "") {
    content = <h1>Data Loading</h1>;
  } else if (status === "success") {
    console.log("Success dtat");
    content = <Outlet />;
  } else if (status === "error") {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
}
export default RequireData;
