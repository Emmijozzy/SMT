/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useFormik } from "formik";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAlert } from "../../alerts/AlertSlice";
import { useRegisterMutation } from "../authApiSlice";
import { registrationSchema } from "../authValidation";
import { RegisterData } from "../authInterface";
import localStorage from "../../../shared/utils/localStorage";
import log from "../../../shared/utils/log";

const { saveToLocalStorage } = localStorage;

const initialValues: RegisterData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const useRegister = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resData, setResData] = useState<any>(null);
  const effectRan = useRef(false);

  const [register, { isSuccess, isError }] = useRegisterMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const data = await register({ ...values });
        setResData(data);
      } catch (e) {
        const error = e as Error;
        log("error", "Registration failed:", error.message, error.stack as string);
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
        const { userId } = resData.data.data;
        dispatch(
          addAlert({
            message: `Kindly keep your ID as it will be used for every login: ${userId as string}`,
            type: "info",
            duration: 60000,
          }),
        );
        saveToLocalStorage("userId", userId as string);
        navigate("/login");
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

export default useRegister;
