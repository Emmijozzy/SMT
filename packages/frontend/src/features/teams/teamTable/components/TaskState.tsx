import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { tasksSelectors } from "../../../tasks/tasksSlice";

type Props = {
  taskIds: string[];
  status: string;
};

function TaskState({ taskIds, status }: Props) {
  const tasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));

  let teamCompleteTask;

  if (tasks.length >= 1) {
    const tasksByStatus = tasks.filter((task) => task.status === status);
    const tasksByTeam = tasksByStatus.filter((task) => taskIds.includes(task.taskId as string));
    teamCompleteTask = tasksByTeam;
    // teamCompleteTask = tasksByTeam.filter(task => task.completion === 100);
    return (
      <div className="text-sm w-full">
        <p className="text-center font-bold text-base-content/80">{teamCompleteTask?.length || 0}</p>{" "}
      </div>
    );
  }
  return <span className="text-sm">0 </span>;
}

export default TaskState;
