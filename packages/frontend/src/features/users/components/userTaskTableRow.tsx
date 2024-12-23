import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import Avartar from "../../../shared/components/Avartar";
import { ISubtask } from "../../subtasks/subtaskInterface";
import PriorityIndicator from "../../tasks/TasksTable/components/PriorityIndicator";
import getDaysLeft from "../../../shared/utils/getDaysLeft";

type Props<T> = {
  data: T;
};

function UserTaskTableRow<T extends ISubtask>({ data }: Props<T>) {
  const content = useMemo(() => {
    if (data) {
      const { title, status, priority, dueDate, subtaskId } = data;

      const daysLeft = getDaysLeft(String(dueDate) || new Date().toDateString());

      return (
        <tr className="border-b-[1px] border-base-content/40 hover:bg-base-300 capitalize">
          <td className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex px-2 py-1">
              <div className="mr-2">
                <Avartar name={title || ""} className="w-[2.5rem] h-[2.5rem]" />
              </div>
              <div className="flex flex-col justify-center">
                <h6 className="mb-0 text-sm leading-normal text-base-content/80 capitalize">{title}</h6>
                <p className="mb-0 text-xs leading-tight text-base-content/50">{subtaskId}</p>
              </div>
            </div>
          </td>
          <td className="border-t-0 w-12 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize ">
            <div className="flex items-center gap-1">
              <PriorityIndicator priority={priority} />
              {priority}
            </div>
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize">
            <div>
              <div className="w-2 h-2 rounded-full bg-orange-500 mr-2 inline-block" />
              {status}
            </div>
          </td>
          <td className="max-w-32 border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <span>{daysLeft}</span>
          </td>
          <td aria-label="Action" className="p-2 align-middle bg-transparent whitespace-nowrap shadow-transparent">
            <div className="flex justify-center items-center gap-5">
              <Link to={`../users/${subtaskId}/view`}>
                <GrView className="h-6 w-6 text-base-content/70 hover:text-info cursor-pointer" />
              </Link>
            </div>
          </td>
        </tr>
      );
    }

    return (
      <tr>
        <td className="text-center">
          <span>...Loading</span>
        </td>
      </tr>
    );
  }, [data]);

  return content;
}

export default UserTaskTableRow;
