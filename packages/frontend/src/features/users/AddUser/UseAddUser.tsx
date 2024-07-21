import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResData from "../../../shared/interface/resdata";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { addUserSchema } from "./addUserValidation";
import AddUser from "./AddUserInterface";
import { useCreateUserMutation } from "./AddUserApiSlice";

const initialValues: AddUser = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNo: "+234",
  role: "team_member",
  team: "",
  location: "",
  whatsappLink: "",
  facebookLink: "",
  linkedInLink: "",
  canCreateTasks: false,
  canEditTasks: false,
  canDeleteTasks: false,
  canViewReports: false,
  canAddSubtasks: false,
  canReassignTasks: false,
  canDeleteUsers: false,
  canEditUsers: false,
  canAssignRole: false,
  password: "",
  confirmPassword: "",
};

function UseAddUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createUser, { isSuccess, isError }] = useCreateUserMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: addUserSchema,
    onSubmit: async (values: AddUser) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        // console.log(values);
        const resData = (await createUser({ ...values })) as ResData;
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        navigate("/dash/users");
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
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    isSubmitting,
    isSuccess,
  };
}
export default UseAddUser;
