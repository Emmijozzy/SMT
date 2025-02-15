import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { Link } from "react-router-dom";
import Avartar from "../../../shared/components/Avartar";
import PriorityIndicator from "../../../shared/components/PriorityIndicator";
import StatusIndicator from "../../../shared/components/StatusIndicator";
import User from "../../../shared/components/User";
import { Status } from "../../../shared/interface/status";
import getDaysLeft from "../../../shared/utils/getDaysLeft";
import { ISubtask } from "../subtaskInterface";

type Props<T> = {
  data: T;
};

function SubtaskRow<T extends ISubtask>({ data }: Props<T>) {
  const content = useMemo(() => {
    if (data) {
      const { subtaskId, title, priority, status, assignee, dueDate } = data;

      const daysLeft = getDaysLeft(dueDate.toString() || new Date().toDateString());
      return (
        <tr className="relative hover:bg-base-100">
          <td className="border-t-0 w-80 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 py-1 text-left flex items-center">
            <Avartar name={title} imgUrl="" />
            <div>
              <span className="ml-3 font-bold truncate ... text-base-content capitalize hover:overflow-visible hover:bg-base-100">
                {title}
              </span>
              <p className="ml-3 text-xs leading-tight text-base-content/50">{subtaskId}</p>
            </div>
          </td>
          <td
            aria-label=" Task assignee"
            className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 py-1 capitalize"
          >
            <User
              userId={assignee}
              withName
              index={1}
              avaterClassName="w-[2.8rem] h-[2.8rem] rounded-full text-sm font-bold border-2 border-blueGray-50 shadow"
            />
          </td>
          <td className="border-t-0 w-12 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 py-1 capitalize ">
            <div className="flex items-center gap-1">
              <PriorityIndicator priority={priority} />
              {priority}
            </div>
          </td>
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 py-1 capitalize">
            <div className="flex items-center gap-1">
              <StatusIndicator status={status as Status} />
              {status?.replace("_", " ")}
            </div>
          </td>
          <td className="max-w-32 border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 py-1">
            <span>{daysLeft}</span>
          </td>
          <td className="border-t-0 max-w-20 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 py-1 text-right">
            <Link
              to={`./subtask/${subtaskId}`}
              className="flex view justify-between"
              aria-label={`View subtask ${title}`}
            >
              <GrView className="h-6 w-6 text-base-content/70 hover:text-secondary cursor-pointer" aria-hidden="true" />
            </Link>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td className="text-center" colSpan={6}>
          <span>...Loading</span>
        </td>
      </tr>
    );
  }, [data]);
  return content; // Return the content of the task row, or a loading spinner if data is not available
}

export default SubtaskRow;
