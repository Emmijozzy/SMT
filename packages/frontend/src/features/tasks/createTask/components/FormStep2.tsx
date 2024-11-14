import { ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import Select from "../../../../shared/components/Select";
import ToggleSwitch from "../../../../shared/components/ToggleSwitch";
import { teamSelectors } from "../../../teams/teamSlice";
import { usersSelectors } from "../../../users/userSlice";
import { ITask } from "../../tasksInterface";

type Props = {
  onNext: () => void;
  onPrevious: () => void;
  handleChange: (e: ChangeEvent<unknown>) => void;
  values: ITask;
};
function FormStep2({ onNext, onPrevious, values, handleChange }: Props) {
  const users = useSelector((state: RootState) => usersSelectors.selectAll(state)).filter(
    (user) => user.role === "manager",
  );

  const teams = useSelector((state: RootState) => teamSelectors.selectAll(state));

  return (
    <div>
      <div className="w-full px-2">
        <Select
          name="responsibleTeam"
          label="Team"
          placeholder="Select responsible team"
          teamsOptions={teams && (teams.map((team) => [team.teamId, team.name]) as string[][])}
          className="gap-[1.6rem] pt-2"
          handleChange={handleChange}
        />
        <ToggleSwitch
          id="managerTask"
          label="Manafer Task"
          value={values.managerTask as unknown as boolean}
          onChange={handleChange}
        />
        <Select
          name="managerId"
          label="Manager"
          placeholder="Select Manager"
          usersOption={users}
          className="gap-[1.6rem] pt-2"
          value={values.managerId}
          handleChange={handleChange}
          disabled={!values.managerTask}
        />
      </div>
      <div className="w-full flex mt-4 justify-between bg-base-100 pt-4">
        <button
          type="button"
          className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
          onClick={onPrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="px-8 py-3 button text-center text-base-content border transition-all bg-base-300 hover:scale-[105%] hover:shadow-lg hover:shadow-base-300 hover:bg-base-content hover:text-base-300  rounded-lg cursor-pointer ease-in"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}
export default FormStep2;
