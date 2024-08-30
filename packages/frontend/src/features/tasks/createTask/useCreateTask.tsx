import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResData from "../../../shared/interface/resdata";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { useCreateTaskMutation } from "../tasksApiSlice";
import User from "../../users/userInterface";
import { userSchema } from "../../users/userValidation";
import { ITask } from "../tasksInterface";
import taskSchema from "../taskSchema";

const initialValues: ITask = {
  title : "",
  description: "",
  responsibleTeam: "",
  status: "not started",
  managerTask: false,
  managerId: "",
  priority: "low",
  startDate: new Date(Date.now()).toISOString().split("T")[0],
  dueDate: new Date(Date.now()).toISOString().split("T")[0],
}


const useCreateTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createTask, { isSuccess, isError }] = useCreateTaskMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values: ITask) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        // console.log(values);
        const resData = (await createTask({ ...values })) as ResData;
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        navigate("/dash/tasks");
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", "Error creating new task", err.message, err.stack as string);
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
};
export default useCreateTask;
