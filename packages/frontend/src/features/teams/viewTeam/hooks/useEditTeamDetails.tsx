/* eslint-disable indent */
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import log from "../../../../shared/utils/log";
import { addAlert } from "../../../alerts/AlertSlice";
import { setLoader } from "../../../loading/loaderSlice";
import { ITask } from "../../../tasks/tasksInterface";
import { IUser } from "../../../users/userInterface";
import { useUpdateTeamMutation } from "../../teamApiSlice";
import teamDetailsSchema from "../../teamDetailsSchema";
import { ITeam } from "../../teamInterface";
import { teamSelectors } from "../../teamSlice";

const defaultValues = {
  teamId: "",
  name: "",
  description: "",
  managerId: "",
};

const useEditTeamDetails = (teamId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const team = useSelector((state: RootState) => teamSelectors.selectById(state, teamId)) as ITeam;
  const initialValues = team || defaultValues;
  // Implement hook logic here

  const [updateTeam, { isSuccess }] = useUpdateTeamMutation();

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema: teamDetailsSchema,
    onSubmit: async (values) => {
      const updatedValues = { ...values };
      updatedValues.members = Array.isArray(updatedValues.members)
        ? updatedValues.members
            .map((member: IUser | string) => (typeof member === "object" ? member.userId : member))
            .filter((id): id is string => id !== undefined)
        : updatedValues.members;
      updatedValues.tasks = Array.isArray(updatedValues.tasks)
        ? updatedValues.tasks
            .map((task: ITask | string) => (typeof task === "object" ? task.taskId : task))
            .filter((id): id is string => id !== undefined)
        : updatedValues.tasks;
      updatedValues.subTasks = Array.isArray(updatedValues.subTasks)
        ? updatedValues.subTasks.map((subTask: string) => subTask).filter((id): id is string => id !== undefined)
        : updatedValues.subTasks;
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        await updateTeam({ teamId, updatedTeam: updatedValues });
        dispatch(setLoader(false));
        dispatch(addAlert({ message: "Team updated successfully!", type: "success" }));
        window.history.back();
      } catch (e) {
        const error = e as Error;
        dispatch(setLoader(false));
        dispatch(addAlert({ message: "Failed to update team.", type: "error" }));
        log("error", "Update profile Error", error.message, error.stack as string);
      } finally {
        setIsSubmitting(false);
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
export default useEditTeamDetails;
