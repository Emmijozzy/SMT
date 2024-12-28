/* eslint-disable indent */
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { FormikErrors } from "formik";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import InputField3 from "../../../shared/components/InputField3";
import Select from "../../../shared/components/Select";
import { IUser } from "../../users/userInterface";
import { usersSelectors } from "../../users/userSlice";
import { ISubtask } from "../subtaskInterface";
import { subtasksSelectors } from "../subtaskSlice";
import useEditSubtaskDetails from "./useEditSubtaskDetails";

type InputType = "input" | "textarea" | undefined;

type Props = {
  showEdit: () => void;
};

function EditSubtaskDetails({ showEdit }: Props) {
  const { subtaskId } = useParams();
  const getSubtask = useSelector((state: RootState) => subtasksSelectors.selectById(state, subtaskId || ""));
  const users = useSelector((state: RootState) => usersSelectors.selectAll(state))?.filter(
    (user) => user.teamId === getSubtask.team,
  );
  const { handleSubmit, handleChange, values, errors } = useEditSubtaskDetails(getSubtask);

  const taskValues = values as ISubtask;
  const taskErrors = errors as FormikErrors<ISubtask>;
  const errorExist = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const renderInputField = <K extends keyof ISubtask>(
    label: string,
    name: K,
    type = "text",
    inputType: InputType = "input",
  ) => (
    <InputField3
      label={label}
      value={
        (type === "date" ? (taskValues[name]?.toString().split("T")[0] as string) : taskValues[name] || "") as string
      }
      name={name}
      error={(taskErrors[name] || "") as string}
      onChange={handleChange}
      inputType={inputType}
      type={type}
      disabled={name === "subtaskId"}
      className="bg-base-200"
    />
  );

  const renderSelect = <T extends keyof ISubtask>(
    label: string,
    name: T,
    options: string[],
    usersOption: IUser[] = [],
  ) => (
    <Select
      label={label}
      name={name}
      placeholder={`Select ${label}`}
      value={(taskValues[name] || "") as string}
      handleChange={handleChange}
      options={options}
      labelClass="md:w-20"
      className="border-b-[1px] border-base-content/40 h-13 text-sm gap-9 "
      usersOption={usersOption}
    />
  );

  return (
    <form onSubmit={handleSubmit} className="w-full p-4 bg-base-100 rounded-lg transition-all">
      <div className="w-full flex items-center justify-between">
        <h6 className="h6 capitalize font-bold">Edit Task Details</h6>
        <div className="flex gap-4">
          <button
            disabled={errorExist}
            type="submit"
            aria-label="Save Task"
            className={`cursor-pointer hover:text-base-content/40 ${errorExist ? "text-base-content/40" : ""}`}
          >
            <SaveAsIcon className="w-8 h-8" />
          </button>
          <button
            type="button"
            aria-label="Go Back"
            onClick={showEdit}
            className="cursor-pointer hover:text-base-content/40"
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-nowrap text-base-content">
        {renderInputField("Subtask Id", "subtaskId")}
        {renderInputField("Title", "title")}
        <div className="grid grid-cols-2 gap-4">
          {renderSelect("Assignee", "assignee", [], users)}
          {renderInputField("Due Date", "dueDate", "date")}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {renderSelect("Status", "status", ["open", "pending", "completed"])}
          {renderSelect("Priority", "priority", ["low", "medium", "high"])}
        </div>
        {renderInputField("Description", "description", "text", "textarea")}
      </div>
    </form>
  );
}

export default EditSubtaskDetails;
