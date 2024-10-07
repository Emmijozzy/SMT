import { useMemo } from "react";
import { GrView } from "react-icons/gr";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../../app/store";
import Avartar from "../../../../shared/components/Avartar";
import Users from "../../../../shared/components/Users";
import { ITeam } from "../../teamInterface";
import { teamSelectors } from "../../teamSlice";
import TaskState from "./TaskState";

type Props = {
  teamId: string;
};

function TeamTableRow({ teamId }: Props) {
  const getTeam = useSelector((state: RootState) => teamSelectors.selectById(state, teamId)) as ITeam;

  const content = useMemo(() => {
    if (getTeam.description) {
      const { name, members, tasks } = getTeam;
      return (
        <tr className="relative hover:bg-base-100">
          <td className="border-t-0 w-64 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 text-left flex items-center">
            <Avartar name={name} imgUrl="" aria-label={`Avatar for ${name}`} />
            <span className="ml-3 font-bold truncate ... text-base-content capitalize hover:overflow-visible hover:bg-base-100">
              {name}
            </span>
          </td>
          <td className="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 capitalize">
            <Users users={members} aria-label={`Members of ${name}`} />
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <TaskState
              taskIds={(tasks as string[]) || []}
              status="not started"
              aria-label={`Not started tasks for ${name}`}
            />
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <TaskState
              taskIds={(tasks as string[]) || []}
              status="in progress"
              aria-label={`In progress tasks for ${name}`}
            />
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <TaskState
              taskIds={(tasks as string[]) || []}
              status="Completed"
              aria-label={`Completed tasks for ${name}`}
            />
          </td>
          <td className="border-t-0 px-4align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2">
            <TaskState taskIds={(tasks as string[]) || []} status="closed" aria-label={`Closed tasks for ${name}`} />
          </td>

          <td className="border-t-0 max-w-20 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap px-2 pt-2 text-right">
            <Link to={`${teamId}`} className="flex view justify-between" aria-label={`View details for ${name}`}>
              <GrView className="h-6 w-6 text-base-content/70 hover:text-secondary cursor-pointer" />
            </Link>
          </td>
        </tr>
      );
    }
    return null;
  }, [getTeam, teamId]);

  return content;
}

export default TeamTableRow;
