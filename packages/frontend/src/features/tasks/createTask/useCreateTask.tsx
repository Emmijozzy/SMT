import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/resData";
import log from "../../../shared/utils/log";
import { toSentenceCase } from "../../../shared/utils/toSentenceCase";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { useCreateTaskMutation } from "../tasksApiSlice";
import taskSchema from "../taskSchema";
import { ITask } from "../tasksInterface";

const initialValues: ITask = {
  title: "",
  description: "",
  responsibleTeam: "",
  status: "not started",
  managerTask: false,
  managerId: "",
  priority: "low",
  startDate: "",
  dueDate: "",
};

const useCreateTask = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createTask, { isSuccess, isError }] = useCreateTaskMutation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values: ITask) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload = {
          ...values,
          description: toSentenceCase(values.description),
        };

        const resData = (await createTask({ ...payload })) as ResData<ITask>;
        // console.log(resData);
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData<ITask>;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        window.history.back();
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

  const { handleSubmit, handleBlur, handleChange, errors, values, validateForm } = formik;

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    isSubmitting,
    isSuccess,
    validateForm,
  };
};
export default useCreateTask;
