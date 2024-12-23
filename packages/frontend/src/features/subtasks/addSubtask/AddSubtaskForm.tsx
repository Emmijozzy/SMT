import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import Button2 from "../../../shared/components/Button2";
import InputField3 from "../../../shared/components/InputField3";
import Select from "../../../shared/components/Select";
import { ITeam } from "../../teams/teamInterface";
import { IUser } from "../../users/userInterface";
import { ISubtask } from "../subtaskInterface";

type Props = {
  handleSubmit: () => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<ISubtask>;
  values: Partial<ISubtask>;
  users: IUser[];
  teams: ITeam[];
};

function AddSubtaskForm({ handleSubmit, handleChange, errors, values, users, teams }: Props) {
  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
      <InputField3
        label="Task ID"
        placeholder="Enter subtask title"
        onChange={handleChange}
        value={values.taskId || ""}
        name="taskId"
        disabled
      />
      <InputField3
        label="Title"
        placeholder="Enter subtask title"
        onChange={handleChange}
        value={values.title || ""}
        error={errors.title}
        name="title"
      />
      <InputField3
        label="Description"
        placeholder="Enter subtask Details"
        onChange={handleChange}
        value={values.description || ""}
        error={errors.description}
        inputType="textarea"
        name="description"
        className="text-sm"
      />
      <div className="flex flex-wrap justify-between">
        <Select
          label="Assignee"
          name="assignee"
          placeholder="Select a user"
          className="text-sm md:max-w-[49%] border-b-base-content/40 border-b-[1px]"
          labelClass="md:mr-9"
          usersOption={users}
          handleChange={handleChange}
        />
        <Select
          label="Priority"
          name="priority"
          placeholder="Select subtask priority"
          labelClass="md:mr-9"
          className="text-sm md:max-w-[49%] border-b-base-content/40 border-b-[1px]"
          options={["low", "medium", "high"]}
          handleChange={handleChange}
        />
      </div>
      <div className="flex flex-wrap justify-between">
        <InputField3
          label="Due Date"
          onChange={handleChange}
          value={
            typeof values.dueDate === "string" ? values.dueDate : values.dueDate?.toISOString().split("T")[0] || ""
          }
          className="text-sm border-b-base-content/40 border-b-[1px]"
          bodyClassName="md:max-w-[49%]"
          type="date"
          error={errors.dueDate as string}
          name="dueDate"
        />
        <Select
          label="Team"
          name="team"
          placeholder="Select team"
          labelClass="md:mr-12"
          value={values.team}
          className="text-sm md:max-w-[49%] border-b-base-content/40 border-b-[1px]"
          teamsOptions={teams.map((team) => [team.teamId, team.name] as [string, string])}
          handleChange={handleChange}
          disabled
        />
      </div>

      <Button2 type="submit" className="w-20 mx-auto mt-3">
        Submit
      </Button2>
    </form>
  );
}

export default AddSubtaskForm;
