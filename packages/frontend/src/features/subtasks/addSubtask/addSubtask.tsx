import ArrowBackSharpIcon from "@mui/icons-material/ArrowBackSharp";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import { handleBack } from "../../../shared/utils/handleBack";
import { tasksSelectors } from "../../tasks/tasksSlice";
import AddSubtaskForm from "./AddSubtaskForm";
import useAddSubtask from "./useAddSubtask";

function AddSubtask() {
  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    checklists,
    requiredFields,
    handleAddCheckList,
    handleRemoveCheckList,
    handleAddRequiredField,
    handleRemoveRequiredField,
  } = useAddSubtask();

  const { taskId } = useParams();
  const task = useSelector((state: RootState) => tasksSelectors.selectById(state, taskId || ""));
  values.taskId = taskId || "";

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
            checklists={checklists}
            requiredFields={requiredFields}
            handleAddCheckList={handleAddCheckList}
            handleRemoveCheckList={handleRemoveCheckList}
            handleAddRequiredField={handleAddRequiredField}
            handleRemoveRequiredField={handleRemoveRequiredField}
          />
        </div>
      </div>
    </div>
  );
}
export default AddSubtask;
