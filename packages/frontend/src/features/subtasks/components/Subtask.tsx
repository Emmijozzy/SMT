import { Link, useParams } from "react-router-dom";
import Button2 from "../../../shared/components/Button2";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import { subtaskColumns } from "../constants/subtaskColumns";
import { ISubtask } from "../subtaskInterface";
import SubtaskRow from "./SubtaskRow";

type Props = {
  subtasks: Partial<ISubtask>[];
};

function Subtask({ subtasks }: Props) {
  const SubtaskTable = MasterTable<ISubtask & Record<string, unknown>>();

  const { taskId } = useParams();

  return (
    <>
      <div className="">
        <div className="w-full flex items-center justify-center">
          <Link to={taskId ? `../${taskId}/add_subtask` : "../"} className="w-[95%]">
            <Button2 type="button" className="w-full">
              Add Sub Task
            </Button2>
          </Link>
        </div>
      </div>
      <SubtaskTable
        name="Subtask"
        tableHead={subtaskColumns}
        data={(subtasks as (ISubtask & Record<string, unknown>)[]) || []}
        TableBody={SubtaskRow}
      />
    </>
  );
}
export default Subtask;
