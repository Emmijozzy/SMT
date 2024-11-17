/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import log from "../../shared/utils/log";
// import { loginSchema } from "../../auth/authValidation";
import { RootState } from "../../app/store";
import ResData from "../../shared/interface/resdata";
import { addAlert } from "../alerts/AlertSlice";
import { setLoader } from "../loading/loaderSlice";
import { useUpdateUserProfileMutation } from "../users/userApiSlice";
import { IUser } from "../users/userInterface";
import { userProfileUpdateSchema } from "./profileValidation";
import { saveProfile } from "./userProfileSlice";

const defaultValue = {
  firstName: "",
  LastName: "",
  email: "",
  phone: "",
  location: "",
  socialLinks: {
    whatsappLink: "",
    facebookLink: "",
    linkedInLink: "",
  },
};

const useUpdateProfileInfo = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateProfile, { isSuccess, isError }] = useUpdateUserProfileMutation();

  let userProfile: Partial<IUser> = useSelector((state: RootState) => state.userProfile)
    .userProfile as unknown as IUser;

  userProfile = userProfile || defaultValue;

  const dispatch = useDispatch();

  const initialValues = {
    firstName: userProfile.firstName,
    LastName: userProfile.lastName,
    email: userProfile.email,
    phone: userProfile.phone_no,
    location: userProfile.location,
    whatsappLink: userProfile?.socialLinks?.whatsappLink,
    facebookLink: userProfile?.socialLinks?.facebookLink,
    linkedInLink: userProfile?.socialLinks?.linkedInLink,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: userProfileUpdateSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload = {
          email: values.email,
          phoneNo: values.phone,
          location: values.location,
          whatsappLink: values.whatsappLink || "",
          facebookLink: values.facebookLink || "",
          linkedInLink: values.linkedInLink || "",
        };
        const resData = (await updateProfile({ ...payload })) as ResData;
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data?.message;
        dispatch(saveProfile(resData.data.data));
        dispatch(addAlert({ message: resMessage, type: "success" }));
        dispatch(setLoader(false));
        // setResData(data);
      } catch (e) {
        const error = e as Error;
        dispatch(setLoader(false));
        dispatch(addAlert({ message: error.message, type: "error" }));
        log("error", "Update profile Error", error.message, error.stack as string);
      } finally {
        setIsSubmitting(false);
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
export default useUpdateProfileInfo;
