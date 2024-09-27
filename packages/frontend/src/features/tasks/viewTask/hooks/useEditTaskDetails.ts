import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../../app/store";
import log from "../../../../shared/utils/log";
import { addAlert } from "../../../alerts/AlertSlice";
import { setLoader } from "../../../loading/loaderSlice";
import { useUpdateTaskMutation } from "../../tasksApiSlice";
import taskSchema from "../../taskSchema";
import { ITask } from "../../tasksInterface";
import { tasksSelectors } from "../../tasksSlice";
import { toSentenceCase } from "../../../../shared/utils/toSentenceCase";

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

  const [updateTask, { isSuccess }] = useUpdateTaskMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTask = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId)) as ITask;

  const task = getTask || defaultValue;

  const initialValues = {
    taskId: task.taskId,
    title: task.title,
    description: task.description,
    responsibleTeam: task.responsibleTeam,
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
        const payload = {
          taskId: values.taskId,
          title: values.title,
          description: toSentenceCase(values.description),
          responsibleTeam: values.responsibleTeam,
          priority: values.priority,
          managerTask: values.managerTask,
          managerId: values.managerId,
          startDate: values.startDate,
          status: values.status.toLowerCase(),
          dueDate: values.dueDate,
          // createdDate: values.createdDate,
        } as ITask;

        console.log(payload);

        await updateTask({ ...payload });
        dispatch(setLoader(false));
        dispatch(addAlert({ message: "Task updated successfully!", type: "success" }));
        navigate("/dash/tasks/");
      } catch (e) {
        const error = e as Error;
        dispatch(setLoader(false));
        dispatch(addAlert({ message: "Failed to update task.", type: "error" }));
        log("error", "Update profile Error", error.message, error.stack as string);
      } finally {
        setIsSubmitting(false);
      }
      // Navigate back to tasks list after editing
      // navigate("/tasks");
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