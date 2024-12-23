import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import { handleBack } from "../../../shared/utils/handleBack";
import { tasksSelectors } from "../../tasks/tasksSlice";
import { teamSelectors } from "../../teams/teamSlice";
import { usersSelectors } from "../../users/userSlice";
import AddSubtaskForm from "./AddSubtaskForm";
import useAddSubtask from "./useAddSubtask";

function AddSubtask() {
  const { handleSubmit, handleChange, errors, values } = useAddSubtask();

  const { taskId } = useParams();
  const teams = useSelector((state: RootState) => teamSelectors.selectAll(state));
  const task = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId || ""));
  const users = useSelector((state: RootState) => usersSelectors.selectAll(state))?.filter(
    (user) =>
      user?.teamId === (typeof task.responsibleTeam === "object" ? task.responsibleTeam.teamId : task.responsibleTeam),
  );
  values.taskId = taskId || "";
  values.team = typeof task.responsibleTeam === "object" ? task.responsibleTeam.teamId : task.responsibleTeam || "";

  return (
    <div className="container">
      <div className="w-full flex flex-col  md:justify-between bg-base-200 p-2">
        <div className="w-full order-1 flex justify-between">
          <h2 className="h6 font-bold capitalize">Add subtask to task: {task.title}</h2>
          <button
            type="button"
            aria-label="Edit User"
            onClick={() => handleBack()}
            className="cursor-pointe ml-auto hover:text-base-content/40"
          >
            <ArrowBackSharpIcon className="w-8 h-8" />
          </button>
        </div>
        <div className="w-full order-2">
          <AddSubtaskForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            errors={errors}
            values={values}
            users={users}
            teams={teams}
          />
        </div>
      </div>
    </div>
  );
}
export default AddSubtask;
