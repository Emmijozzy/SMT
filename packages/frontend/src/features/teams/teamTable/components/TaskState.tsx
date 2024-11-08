import { ITask } from "../../../tasks/tasksInterface";

type Props = {
  tasks: ITask[];
  status: string;
};

function TaskState({ tasks, status }: Props) {
  // console.log(taskIds);

  // let teamCompleteTask;

  if (tasks.length >= 1) {
    const tasksByStatus = tasks.filter((task) => task.status === status);
    // teamCompleteTask = tasksByTeam;
    // teamCompleteTask = tasksByTeam.filter(task => task.completion === 100);
    return (
      <div className="text-sm w-full">
        <p className="text-center font-bold text-base-content/80">{tasksByStatus?.length || 0}</p>{" "}
      </div>
    );
  }
  return <p className=" w-full text-sm text-center">0 </p>;
}

export default TaskState;
