import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import log from "../../../shared/utils/log";
import { addAlert } from "../../alerts/AlertSlice";
import { setLoader } from "../../loading/loaderSlice";
import formatDate from "../../../shared/utils/formatDate";
import { userApiSlice } from "../userApiSlice";
import { store } from "../../../app/store";
import removeEmptyProperties from "../../../shared/utils/removeEmptyProperties";

interface ErrorMessage {
  data: {
    message: string;
  };
}

const initialValues = {
  fullName: "",
  email: "",
  status: "",
  startDate: formatDate(new Date("1-12-1997")),
  endDate: formatDate(new Date(Date.now())),
  role: "",
  team: "",
};

const useFilteredQuery = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchedUserId, setSearchedUserId] = useState<string[]>();

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      dispatch(setLoader(true));
      try {
        const payload = {
          fullName_like: values.fullName,
          email_like: values.email,
          role_like: values.role,
          team_like: values.team,
        };

        const filteredPayload = removeEmptyProperties(payload);
        const { data, isError, isLoading, isSuccess, error } = await store.dispatch(
          userApiSlice.endpoints.getUsers.initiate(filteredPayload),
        );
        if (isSuccess && !isLoading) {
          // console.log(data);
          setSearchedUserId(data.ids);
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
    searchedUserId,
  };
};

export default useFilteredQuery;
