/* eslint-disable indent */
import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import InputField3 from "../../../../shared/components/InputField3";
import Select from "../../../../shared/components/Select";
import { IUser } from "../../../users/userInterface";
import { usersSelectors } from "../../../users/userSlice";
import { ITeam } from "../../teamInterface";
import useEditTeamDetails from "../hooks/useEditTeamDetails";

type Props = {
  teamId: string;
  handleEditTeamDetails: () => void;
};

type InputType = "input" | "textarea" | undefined;

function EditTeamDetails({ teamId, handleEditTeamDetails }: Props) {
  const { handleChange, handleSubmit, errors, values } = useEditTeamDetails(teamId);
  const taskValues = values;
  const taskErrors = errors;

  const managerOptions = useSelector((state: RootState) => usersSelectors.selectAll(state)).filter(
    (user) => user.role === "manager",
  );

  const errorExist = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const renderInputField = <K extends keyof ITeam>(
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
      disabled={name === "teamId"}
      className="bg-base-100"
    />
  );

  const renderSelect = <K extends keyof ITeam>(label: string, name: K, options: IUser[]) => (
    <Select
      label={label}
      name={name}
      placeholder={`Select ${label}`}
      value={(taskValues[name] || "") as string}
      handleChange={handleChange}
      usersOption={options}
      labelClass="md:w-20"
      className="border-b-[1px] border-base-content/40 h-13 text-sm gap-9 pt-2 "
    />
  );

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="w-full p-4 bg-base-200 rounded-lg transition-all">
        <div className="w-full flex items-center justify-between">
          <h6 className="h6 capitalize font-bold">Edit Team Details</h6>
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
              onClick={handleEditTeamDetails}
              className="cursor-pointer hover:text-base-content/40"
            >
              <ArrowBackSharpIcon className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-nowrap text-base-content">
          {renderInputField("Team ID", "teamId")}
          {renderInputField("Name", "name")}
          {renderInputField("Description", "description", "", "textarea")}
          {renderSelect("Manager", "managerId", [...managerOptions])}
        </div>
      </form>
    </div>
  );
}

export default EditTeamDetails;
