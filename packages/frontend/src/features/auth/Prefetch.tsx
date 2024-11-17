import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getPresentStatus } from "../../shared/Slice/statusSlice";
import log from "../../shared/utils/log";
import Loader from "../loading/Loader";
import { userApiSlice } from "../users/userApiSlice";
import { IUser } from "../users/userInterface";
// import { useSelector } from "react-redux";
// import { getPresentUser } from "../users/userProfileSlice";

function Prefetch() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const status = useSelector(getPresentStatus);
  const navigate = useNavigate();

  log("info", "Prefetching data...", "Prefetch");

  const { data: ResponseData, isLoading } = userApiSlice.endpoints.getUserProfile.useQuery("") as {
    data: {
      data: Partial<IUser>;
    };
    isLoading: boolean;
  };

  useEffect(() => {
    if (!isLoading && ResponseData?.data) {
      setDataLoaded(true);
    }
  }, [isLoading, ResponseData]);

  if (status === "error") {
    navigate("/login");
  }

  if (!dataLoaded || isLoading) {
    return <Loader isLoading transparent={false} />;
  }

  return <Outlet />;
}

export default Prefetch;
