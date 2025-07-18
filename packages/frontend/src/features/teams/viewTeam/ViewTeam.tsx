import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import Section from "../../../shared/components/Section";
import { ITask } from "../../tasks/tasksInterface";
import { IUser } from "../../users/userInterface";
import { ITeam } from "../teamInterface";
import { teamSelectors } from "../teamSlice";
import EditTeamDetails from "./components/EditTeamDetails";
import TeamUserRow from "./components/TeamUserRow";
import ViewTeamDetails from "./components/ViewTeamDetails";
import teamTaskColumn from "./constant/teamTaskColumn";
import userColumnFactory from "./constant/userColumnFactory";
// import TaskTableRow from "./TeamTaskTable/components/TaskTableRow";
import { useGetUsersQuery } from "../../users/userApiSlice";
import TeamTaskRow from "./components/TeamTaskRow";

function ViewTeam() {
  const [showWEditDetails, setShowWEditDetails] = useState(false);
  const navigate = useNavigate();
  const { teamId } = useParams();

  if (!teamId) navigate("../");

  const getTeam = useSelector((state: RootState) => teamSelectors.selectById(state, teamId || "")) as ITeam;
  const {
    data: ResUsers,
    // isLoading,
    // isSuccess,
    // isError,
    // error,
  } = useGetUsersQuery(
    { team_like: teamId },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
      refetchOnReconnect: true,
    },
  );
  const teamUserColumns = userColumnFactory();

  const TeamTaskTable = MasterTable<ITask & Record<string, unknown>>();
  const TeamUserTable = MasterTable<IUser & Record<string, unknown>>();

  let content;

  if (getTeam) {
    content = (
      <Section>
        {showWEditDetails ? (
          <EditTeamDetails
            handleEditTeamDetails={() => setShowWEditDetails(!showWEditDetails)}
            teamId={teamId as string}
          />
        ) : (
          <ViewTeamDetails team={getTeam} handleEditTeamDetails={() => setShowWEditDetails(!showWEditDetails)} />
        )}

        {/* Add additional components for managing team users */}
        <TeamUserTable
          name="Members"
          data={(getTeam.members || ResUsers) as (IUser & Record<string, unknown>)[]}
          tableHead={teamUserColumns}
          TableBody={TeamUserRow}
        />
        {/* Add additional components for managing team tasks */}
        <TeamTaskTable
          name="Team Task"
          data={getTeam.tasks as (ITask & Record<string, unknown>)[]}
          tableHead={teamTaskColumn}
          TableBody={TeamTaskRow}
        />
      </Section>
    );
  }

  return content;
}
export default ViewTeam;
