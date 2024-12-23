/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PURGE } from "redux-persist";
import { resetStore } from "../../app/action";
import { addAlert } from "../../features/alerts/AlertSlice";
import { useLazyLogoutQuery } from "../../features/auth/authApiSlice";
import ResData from "../interface/ResData";
import log from "../utils/log";

const useLogout = () => {
  const [logOut, { isSuccess, isError, error }] = useLazyLogoutQuery();
  const [resData, setResData] = useState<ResData | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    const result = (await logOut({})) as ResData;
    setResData(result);
  };

  useEffect(() => {
    if (isSuccess) {
      Promise.resolve()
        .then(() => logOut(undefined))
        .then(() => dispatch(resetStore()))
        // .then(() => navigate("/login"))
        .then(() => dispatch({ type: PURGE, key: "root", result: () => null }))
        .then(() => dispatch(addAlert({ message: "Logout successful", type: "success" })))
        .then(() => {
          window.location.replace("/login");
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
