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

export type CheckLists = {
  id: string;
  checkItem: string;
  isChecked: boolean;
  isApprove: boolean;
  isReject: boolean;
}[];

export type RequiredFields = {
  id: string;
  field: string;
  input: string;
  type: "text" | "link";
}[];

function useAddSubtask() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checklists, setChecklists] = useState<CheckLists>([]);
  const [requiredFields, setRequiredFields] = useState<RequiredFields>([]);

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
          checkLists: checklists,
          requiredFields,
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

  const handleAddCheckList = (checklist: CheckLists[number]) => {
    setChecklists([...checklists, checklist]);
  };

  const handleRemoveCheckList = (id: string) => {
    setChecklists(checklists.filter((checklist) => checklist.id !== id));
  };

  const handleAddRequiredField = (requiredField: RequiredFields[number]) => {
    setRequiredFields([...requiredFields, requiredField]);
  };

  const handleRemoveRequiredField = (id: string) =>
    setRequiredFields(requiredFields.filter((requiredField) => requiredField.id !== id));

  const { handleSubmit, handleBlur, handleChange, errors, values } = formik;

  return {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    isSuccess,
    isSubmitting,
    checklists,
    requiredFields,
    handleAddCheckList,
    handleRemoveCheckList,
    handleAddRequiredField,
    handleRemoveRequiredField,
  };
}

export default useAddSubtask;
