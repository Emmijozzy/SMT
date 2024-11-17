import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import log from "../../../../shared/utils/log";
import { addAlert } from "../../../alerts/AlertSlice";
import { setLoader } from "../../../loading/loaderSlice";
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
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        await updateTeam({ teamId, updatedTeam: values });
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
