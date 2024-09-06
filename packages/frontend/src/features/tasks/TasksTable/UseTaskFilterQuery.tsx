import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
// import formatDate from "../../../shared/utils/formatDate";
// import { userApiSlice } from "../userApiSlice";
import { tasksApiSlice } from "../tasksApiSlice";
import { store } from "../../../app/store";
import removeEmptyProperties from "../../../shared/utils/removeEmptyProperties";
import { setTasks } from "../tasksSlice";

interface ErrorMessage {
  data: {
    message: string;
  };
}

const initialValues = {
  title: "",
  assignedTo: "",
  responsibleTeam: "",
  status: "",
  managerId: "",
  priority: "",
  dueDate: "",
  startDate: "",
};

const UseTaskFilterQuery = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload = {
          title_like: values.title,
          responsibleTeam_like: values.responsibleTeam,
          status_like: values.status,
          managerId_like: values.managerId,
          priority_like: values.priority,
          dueDate_like: values.dueDate,
          startDate_like: values.startDate,
        };

        const filteredPayload = removeEmptyProperties(payload);
        const { data, isError, isLoading, isSuccess, error } = await store.dispatch(
          tasksApiSlice.endpoints.getTasks.initiate(filteredPayload)
        );
        if (isSuccess && !isLoading) {
          // console.log(data);
          // setSearchedUserId(data.ids);
          console.log(data);
          dispatch(setTasks(data));
        } else if (isError) {
          const resError = error as ErrorMessage;
          dispatch(addAlert({ message: resError?.data?.message, type: "error" }));
        }
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
    // isSuccess,
    // searchedUserId,
  };
};

export default UseTaskFilterQuery;
