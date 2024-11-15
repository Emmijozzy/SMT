import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResData from "../../../shared/interface/resdata";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { editUserSchema } from "../userValidation";
import User from "../userInterface";
import { usersSelectors } from "../userSlice";
import { RootState } from "../../../app/store";
import { useUpdateUserMutation } from "../userApiSlice";

function useEditUser(userId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateUser, { isSuccess, isError }] = useUpdateUserMutation();

  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userId));

  // console.log(user);

  const {
    // fullName,
    // profilePicUrl: profilePic,
    firstName,
    lastName,
    email,
    role,
    team,
    teamId,
    // createdAt: joined,
    phone_no: phoneNo,
    location,
    socialLinks,
    permissions: {
      can_create_tasks: canCreateTasks,
      can_edit_tasks: canEditTasks,
      can_delete_tasks: canDeleteTasks,
      can_view_reports: canViewReports,
      can_add_subtasks: canAddSubtasks,
      can_reassign_tasks: canReassignTasks,
      can_delete_users: canDeleteUsers,
      can_edit_users: canEditUsers,
      can_assign_roles: canAssignRole,
    },
  } = user;

  const initialValues: User = {
    userId,
    firstName,
    lastName,
    email,
    phoneNo: `${phoneNo}`,
    role,
    team,
    teamId,
    location,
    whatsappLink: socialLinks?.whatsappLink ?? "https://",
    facebookLink: socialLinks?.facebookLink ?? "https://",
    linkedInLink: socialLinks?.linkedInLink ?? "https://",
    canCreateTasks,
    canEditTasks,
    canDeleteTasks,
    canViewReports: canViewReports || false,
    canAddSubtasks,
    canReassignTasks,
    canDeleteUsers,
    canEditUsers,
    canAssignRole,
    password: "",
    confirmPassword: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: editUserSchema,
    onSubmit: async (values: User) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        // console.log(values);
        const resData = (await updateUser({ ...values })) as ResData;
        // console.log(resData);
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData?.error as ResData;
          throw new Error(resError?.data.message);
        }
        const resMessage = resData?.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        navigate("/dash/users");
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err?.message, type: "error" }));
        log("error", "Change password Error", err?.message, err?.stack as string);
      } finally {
        setIsSubmitting(false);
        dispatch(setLoader(false));
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    isSubmitting,
    isSuccess,
  };
}

export default useEditUser;
