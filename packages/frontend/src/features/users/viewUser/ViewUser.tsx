import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import DetailsContainer from "../../../shared/components/DetailsContainer";
import { useGetSubtasksQuery } from "../../subtasks/subtaskApiSlice";
import { ISubtask } from "../../subtasks/subtaskInterface";
import useRole from "../hooks/useRole";
import { usersSelectors } from "../userSlice";
import SocialLinks from "./components/SocialLinks";
import { UserHeader } from "./components/UserHeader";
import UserTasksTable from "./components/UserTasksTable";
import { generateTableRows } from "./utils/tableRowsGenerator";

function ViewUser() {
  const { userId = "" } = useParams<{ userId: string }>();
  const userRole = useRole();
  const user = useSelector((state: RootState) => usersSelectors.selectById(state, userId));
  const { data: subtasks, isLoading } = useGetSubtasksQuery({ assignee_like: userId });

  const memoizedSubtasks = useMemo(() => subtasks || [], [subtasks]) as (ISubtask & Record<string, unknown>)[];
  const tableRows = useMemo(() => generateTableRows(user), [user]);

  if (!user) return null;

  return (
    <>
      <div className="container transition-all">
        <div className="w-full flex flex-col bg-base-200 rounded-lg py-2 overflow-hidden">
          <UserHeader user={user} userRole={userRole || ""} />

          {user.del_flg ? (
            <div className="w-full flex place-content-center">
              <p className="text-error">User Deleted</p>
            </div>
          ) : (
            <>
              <DetailsContainer tableRows={tableRows} />
              <SocialLinks socialLinks={user.socialLinks} />
            </>
          )}
        </div>
      </div>

      <UserTasksTable data={memoizedSubtasks} isLoading={isLoading} />
    </>
  );
}

export default ViewUser;
