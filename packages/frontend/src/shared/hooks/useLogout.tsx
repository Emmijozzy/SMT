/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { persistor } from "../../app/store";
import { addAlert } from "../../features/alerts/AlertSlice";
import { useLazyLogoutQuery } from "../../features/auth/authApiSlice";
import ResData from "../interface/resdata";
import log from "../utils/log";

const useLogout = () => {
  const [logOut, { isSuccess, isError, error }] = useLazyLogoutQuery();
  const [resData, setResdata] = useState<ResData | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = (await logOut({})) as ResData;
    setResdata(result);
  };

  useEffect(() => {
    if (isSuccess) {
      Promise.all([navigate("/login"), persistor.purge(), localStorage.clear(), window.location.reload()])
        .then(() => {
          dispatch(addAlert({ message: resData?.data.message, type: "success" }));
        })
        .catch((err: Error) => {
          log("error", "Error during logout:", err.message);
          dispatch(addAlert({ message: "An error occurred during logout", type: "error" }));
        });
    }
    if (isError) {
      const err = error as ResData;
      dispatch(addAlert({ message: err?.data.message, type: "error" }));
    }
  }, [dispatch, error, isError, isSuccess, navigate, resData]);
  return {
    handleLogOut,
  };
};

export default useLogout;
