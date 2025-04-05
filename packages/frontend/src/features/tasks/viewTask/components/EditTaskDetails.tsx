/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { FormikErrors } from "formik";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import InputField3 from "../../../../shared/components/InputField3";
import Select from "../../../../shared/components/Select";
import { teamSelectors } from "../../../teams/teamSlice";
import { ITask } from "../../tasksInterface";
import useEditTaskDetails from "../hooks/useEditTaskDetails";

type Props = {
  handleEditTaskDetails: () => void;
  taskId: string;
};

type InputType = "input" | "textarea" | undefined;

function EditTaskDetails({ handleEditTaskDetails, taskId }: Props) {
  const { handleChange, handleSubmit, errors, values } = useEditTaskDetails(taskId);
  const taskValues = values as ITask;
  const taskErrors = errors as FormikErrors<ITask>;

  const teams = useSelector((state: RootState) => teamSelectors.selectAll(state));

  const errorExist = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const renderInputField = <K extends keyof ITask>(
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
      disabled={name === "taskId"}
      className="bg-base-200"
    />
  );

  const renderSelect = <T extends keyof ITask>(
    label: string,
    name: T,
    options: string[],
    teamsOptions: string[][] = [],
  ) => (
    <Select
      label={label}
      name={name}
      placeholder={`Select ${label}`}
      value={(taskValues[name] || "") as string}
      handleChange={handleChange}
      options={options}
      labelClass="md:w-20"
      teamsOptions={teamsOptions}
      className="border-b-[1px] border-base-content/40 h-13 text-sm gap-9 "
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
            onClick={handleEditTaskDetails}
            className="cursor-pointer hover:text-base-content/40"
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-nowrap text-base-content">
        {renderInputField("Task Id", "taskId")}
        {renderInputField("Title", "title")}
        {renderInputField("Description", "description", "text", "textarea")}
        {/* {renderSelect("Team", "responsibleTeam", ["developer", "UI/UX", "Analyst"])} */}
        <div className="md:grid md:grid-cols-2 gap-4">
          {renderInputField("Start Date", "startDate", "date")}
          {renderInputField("Due Date", "dueDate", "date")}
        </div>
        <div className="md:grid md:grid-cols-2 gap-4">
          {renderSelect("team", "responsibleTeam", [], [
            ...teams.map((team) => [team.teamId, team.name]),
          ] as string[][])}
          {renderSelect("Priority", "priority", ["low", "medium", "high"])}
        </div>
      </div>
    </form>
  );
}

export default EditTaskDetails;
