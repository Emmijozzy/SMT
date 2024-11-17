import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getPresentStatus } from "../../shared/Slice/statusSlice";
import Loader from "../loading/Loader";
import { userApiSlice } from "../users/userApiSlice";
import { IUser } from "../users/userInterface";

function RequireData() {
  const status = useSelector(getPresentStatus);
  const location = useLocation();
  console.log("req-data", status);

  const { data: ResponseData, isLoading } = userApiSlice.endpoints.getUserProfile.useQuery("") as {
    data: {
      data: Partial<IUser>;
    };
    isLoading: boolean;
  };

  let content;
  if (status === "loading" || status === "" || isLoading) {
    console.log("loading data");
    content = <Loader isLoading transparent={false} />;
  } else if (status === "success" && ResponseData) {
    console.log("Success dtat");
    content = <Outlet />;
  } else if (status === "error") {
    content = <Navigate to="/login" state={{ from: location }} replace />;
  }
  return content;
}
export default RequireData;
