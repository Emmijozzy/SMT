import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ResData from "../../../shared/interface/resdata";
import log from "../../../shared/utils/log";
import { toSentenceCase } from "../../../shared/utils/toSentenceCase";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import { useCreateTeamMutation } from "../teamApiSlice";
import { ITeam } from "../teamInterface";
import teamSchema from "./teamSchema";

const initialValues: ITeam = {
  name: "",
  description: "",
  managerId: "",
  tasks: [],
  subTasks: [],
};

const useCreateTeam = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [createTeam, { isSuccess, isError }] = useCreateTeamMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: teamSchema,
    onSubmit: async (values: ITeam) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload = {
          ...values,
          description: toSentenceCase(values.description),
        };

        const resData = (await createTeam({ ...payload })) as ResData;
        // console.log(resData);
        if (Object.keys(resData)[0] === "error" || isError) {
          const resError = resData.error as ResData;
          throw new Error(resError.data.message);
        }
        const resMessage = resData.data.message;
        dispatch(addAlert({ message: resMessage, type: "success" }));
        navigate("/dash/teams");
      } catch (e) {
        const err = e as Error;
        dispatch(addAlert({ message: err.message, type: "error" }));
        log("error", "Error creating new team", err.message, err.stack as string);
      } finally {
        setIsSubmitting(false);
        dispatch(setLoader(false));
      }
    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  const handleFormValidation = () => {
    const errorsArr = Object.values(errors);
    errorsArr?.forEach((err) => {
      dispatch(addAlert({ message: err, type: "error" }));
    });
  };

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    isSubmitting,
    isSuccess,
    handleFormValidation,
  };
};

export default useCreateTeam;
