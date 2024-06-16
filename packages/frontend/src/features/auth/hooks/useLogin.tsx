/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAlert } from "../../alerts/AlertSlice";
import { useLoginMutation } from "../authApiSlice";
import { loginSchema } from "../authValidation";
import localStorage from "../../../shared/utils/localStorage";
import { LoginData } from "../authInterface";
import log from "../../../shared/utils/log";
import { setCredentials } from "../authSlice";

const { getDataFromLocalStorage } = localStorage;

const initialValues: LoginData = {
  userId: (getDataFromLocalStorage("userId") as string) || " ",
  password: "",
};

const useLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const effectRan = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isError, isSuccess }] = useLoginMutation();
  const [resData, setResData] = useState<any>(null);

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const data = await login({ ...values });
        setResData(data);
      } catch (e) {
        const error = e as Error;
        log("error", "Login Error", error.message, error.stack as string);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (effectRan.current || process.env.NODE_ENV !== "development") {
      if (isSuccess && resData) {
        const alertMessage = resData.data.message as string;
        dispatch(addAlert({ message: alertMessage, type: "success" }));
        const { accessToken } = resData.data.data;
        if (accessToken) {
          dispatch(setCredentials(accessToken));
        }
        navigate("/dash");
      }
      if (isError && resData && resData.error && resData.error.data && resData.error.data.message) {
        dispatch(addAlert({ message: resData.error.data.message, type: "error" }));
      }
    }
    return () => {
      effectRan.current = true;
    };
  }, [resData]);

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  return {
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
  };
};
export default useLogin;
