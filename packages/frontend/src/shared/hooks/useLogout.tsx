/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyLogoutQuery } from "../../features/auth/authApiSlice";
import ResData from "../interface/resdata";
import { addAlert } from "../../features/alerts/AlertSlice";

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
      navigate("/login");
      dispatch(addAlert({ message: resData?.data.message, type: "success" }));
    }
    if (isError) {
      const err = error as ResData;
      dispatch(addAlert({ message: err?.data.message, type: "error" }));
    }
  }, [dispatch, error, isError, isSuccess, navigate]);

  return {
    handleLogOut,
  };
};

export default useLogout;
