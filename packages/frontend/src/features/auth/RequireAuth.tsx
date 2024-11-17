/* eslint-disable indent */

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPresentStatus } from "../../shared/Slice/statusSlice";
import log from "../../shared/utils/log";
import Loader from "../loading/Loader";
import { userApiSlice } from "../users/userApiSlice";
import { IUser } from "../users/userInterface";

function RequireAuth() {
  const status = useSelector(getPresentStatus);
  // const location = useLocation();
  const navigate = useNavigate();
  const { data: ResponseData, isLoading } = userApiSlice.endpoints.getUserProfile.useQuery("") as {
    data: {
      data: Partial<IUser>;
    };
    isLoading: boolean;
  };

  log("info", "Authorizing user...", "RequireAuth");

  const getRedirectPath = (role?: string) => {
    switch (role) {
      case "admin":
        return "/admin/dash";
      case "manager":
        return "/manager/dash";
      case "team_member":
        return "/team_member/dash";
      default:
        return "/auth";
    }
  };

  useEffect(() => {
    if (!isLoading && ResponseData?.data?.role) {
      const redirectPath = getRedirectPath(ResponseData.data?.role);
      navigate(redirectPath, { replace: true });
    }
  }, [ResponseData, isLoading, navigate]);

  // if (status === "error") {
  //   log("error", "User not authorized", "RequireAuth");
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  if (status === "loading" || status === "" || isLoading) {
    return <Loader isLoading transparent={false} />;
  }
}

export default RequireAuth;
