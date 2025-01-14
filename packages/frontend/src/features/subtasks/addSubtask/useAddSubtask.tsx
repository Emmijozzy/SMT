import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/resData";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import addSubtaskSchema from "../addSubtaskSchema";
import { useAddSubtaskMutation } from "../subtaskApiSlice";
import { ISubtask } from "../subtaskInterface";

const initialValues: Partial<ISubtask> = {
  taskId: "",
  team: "",
  title: "",
  description: "",
  priority: "medium",
  assignee: "",
  dueDate: new Date(),
};

function useAddSubtask() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addSubtask, { isSuccess, isError }] = useAddSubtaskMutation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: addSubtaskSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload: Partial<ISubtask> = {
          ...values,
          dueDate: values.dueDate,
        };
        const resData = (await addSubtask(payload)) as ResData<ISubtask>;
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error;
          throw new Error(resError?.data?.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        window.history.back();
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", "Error adding new subtask", err.message, err.stack as string);
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
    isSuccess,
    isSubmitting,
  };
}

export default useAddSubtask;
