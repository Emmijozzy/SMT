/* eslint-disable no-param-reassign */
import { FormikErrors } from "formik";
import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../app/store";
import InputField3 from "../../../../shared/components/InputField3";
import Select from "../../../../shared/components/Select";
import { ITask } from "../../../tasks/tasksInterface";
import { tasksSelectors } from "../../../tasks/tasksSlice";
import { teamSelectors } from "../../../teams/teamSlice";
import { usersSelectors } from "../../../users/userSlice";
import { ISubtask } from "../../subtaskInterface";

type Props = {
  handleChange: (e: ChangeEvent<unknown>) => void;
  errors: FormikErrors<ISubtask>;
  values: Partial<ISubtask>;
};

export function SubtaskBasicInfo({ handleChange, errors, values }: Props) {
  const { taskId } = useParams();
  const teams = useSelector((state: RootState) => teamSelectors.selectAll(state));
  const task = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId || "")) as ITask;
  values.team = typeof task?.responsibleTeam == "object" ? task?.responsibleTeam.teamId : task.responsibleTeam;

  const users = useSelector((state: RootState) => usersSelectors.selectAll(state))?.filter(
    (user) =>
      user?.teamId ===
      (typeof task?.responsibleTeam === "object" ? task.responsibleTeam?.teamId : task?.responsibleTeam),
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField3
          label="Task ID"
          placeholder="Enter subtask title"
          onChange={handleChange}
          value={values.taskId || ""}
          name="taskId"
          disabled
          className="w-full"
        />
        <InputField3
          label="Title"
          placeholder="Enter subtask title"
          onChange={handleChange}
          value={values.title || ""}
          error={errors.title}
          name="title"
          className="w-full"
        />
      </div>
      <InputField3
        label="Description"
        placeholder="Enter subtask Details"
        onChange={handleChange}
        value={values.description || ""}
        error={errors.description}
        inputType="textarea"
        name="description"
        className="text-sm w-full min-h-[120px]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Assignee"
          name="assignee"
          placeholder="Select a user"
          className="text-sm w-full border-b-base-content/40 border-b-[1px]"
          labelClass="block mb-2"
          usersOption={users}
          handleChange={handleChange}
        />
        <Select
          label="Priority"
          name="priority"
          placeholder="Select subtask priority"
          labelClass="block mb-2"
          className="text-sm w-full border-b-base-content/40 border-b-[1px]"
          options={["low", "medium", "high"]}
          handleChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField3
          label="Due Date"
          onChange={handleChange}
          value={
            typeof values.dueDate === "string" ? values.dueDate : values.dueDate?.toISOString().split("T")[0] || ""
          }
          className="text-sm w-full border-b-base-content/40 border-b-[1px]"
          type="date"
          error={errors.dueDate as string}
          name="dueDate"
        />
        <Select
          label="Team"
          name="team"
          placeholder="Select team"
          labelClass="block mb-2"
          value={values.team}
          className="text-sm w-full border-b-base-content/40 border-b-[1px]"
          teamsOptions={teams.map((team) => [team.teamId, team.name] as [string, string])}
          handleChange={handleChange}
          disabled
        />
      </div>
    </>
  );
}
