/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import log from "../../../shared/utils/log";
// import { loginSchema } from "../../auth/authValidation";
import { useChangePasswordMutation } from "../userApiSlice";
import { changedPasswordSchema } from "./profileValidation";
import { setLoader } from "../../loading/loaderSlice";
import { addAlert } from "../../alerts/AlertSlice";
import ResData from "../../../shared/interface/resdata";

const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const useChangePassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [changePassword, { isSuccess, isError }] = useChangePasswordMutation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: changedPasswordSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const resData = (await changePassword({ ...values })) as ResData;
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }

        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", "Change password Error", err.message, err.stack as string);
      } finally {
        setIsSubmitting(false);
        dispatch(setLoader(false));
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  return {
    isSuccess,
    isSubmitting,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
  };
};
export default useChangePassword;
