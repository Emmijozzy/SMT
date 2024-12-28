import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ResData from "../../../shared/interface/ResData";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { EditSubtaskSchema } from "../EditSubtaskSchema";
import { useUpdateSubtaskMutation } from "../subtaskApiSlice";
import { ISubtask } from "../subtaskInterface";

const defaultValue = {
  subtaskId: "",
  title: "",
  description: "",
  status: "open",
  priority: "low",
  assignee: "",
  dueDate: new Date(),
};

function useEditSubtaskDetails(subtask: ISubtask) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSubtask, { isSuccess, isError }] = useUpdateSubtaskMutation();

  const dispatch = useDispatch();

  const { subtaskId, title, description, status, priority, assignee, dueDate }: Partial<ISubtask> =
    subtask || defaultValue;

  const initialValues = {
    subtaskId,
    title,
    description,
    status,
    priority,
    assignee,
    dueDate,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: EditSubtaskSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload = {
          ...subtask,
          ...values,
        };
        const resData = (await updateSubtask(payload)) as ResData;
        // console.log(resData);
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        window.history.back();
      } catch (e) {
        const error = e as Error;
        dispatch(setLoader(false));
        dispatch(addAlert({ message: "Failed to update task.", type: "error" }));
        log("error", "Update profile Error", error.message, error.stack as string);
      } finally {
        setIsSubmitting(false);
        dispatch(setLoader(false));
      }
    },
  });

  const { handleSubmit, handleChange, errors, values } = formik;

  return {
    isSuccess,
    isSubmitting,
    handleChange,
    handleSubmit,
    errors,
    values,
  };
}

export default useEditSubtaskDetails;
