import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import ResData from "../../../../shared/interface/resData";
import log from "../../../../shared/utils/log";
import { toSentenceCase } from "../../../../shared/utils/toSentenceCase";
import { addAlert } from "../../../alerts/AlertSlice";
import { setLoader } from "../../../loading/loaderSlice";
import { useUpdateTaskMutation } from "../../tasksApiSlice";
import taskSchema from "../../taskSchema";
import { ITask } from "../../tasksInterface";
import { tasksSelectors } from "../../tasksSlice";

const defaultValue = {
  taskId: "",
  title: "",
  description: "",
  responsibleTeam: "",
  priority: "low",
  managerTask: false,
  managerId: "",
  status: "Not Started",
  startDate: new Date(),
  dueDate: new Date(),
  createdDate: new Date(),
};

const useEditTaskDetails = (taskId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updateTask, { isSuccess, isError }] = useUpdateTaskMutation();

  const dispatch = useDispatch();

  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId)) as ITask;

  const task: ITask = getTask || defaultValue;

  const initialValues = {
    taskId: task.taskId,
    title: task.title,
    description: task.description,
    responsibleTeam: typeof task.responsibleTeam === "object" ? task.responsibleTeam.teamId : task.responsibleTeam,
    priority: task.priority,
    managerTask: task.managerTask,
    managerId: task.managerId,
    startDate: task.startDate,
    status: task.status,
    dueDate: task.dueDate,
    // createdDate: task.createdDate,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: taskSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload: ITask = {
          ...getTask,
          taskId: values.taskId,
          title: values.title,
          description: toSentenceCase(values.description),
          responsibleTeam: values.responsibleTeam,
          priority: values.priority,
          managerTask: values.managerTask,
          managerId: values.managerId,
          startDate: values.startDate,
          status: values.status.toLowerCase() as "not started" | "in progress" | "completed" | "closed",
          dueDate: values.dueDate,
          // createdDate: values.createdDate,
        };

        const resData = (await updateTask({ ...payload })) as ResData;
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
};
export default useEditTaskDetails;
