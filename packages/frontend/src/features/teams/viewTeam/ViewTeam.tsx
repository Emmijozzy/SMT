import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import MasterTable from "../../../shared/components/masterTable/MasterTable";
import Section from "../../../shared/components/Section";
import { ITask } from "../../tasks/tasksInterface";
import { tasksSelectors } from "../../tasks/tasksSlice";
import { IUser } from "../../users/userInterface";
import { usersSelectors } from "../../users/userSlice";
import { ITeam } from "../teamInterface";
import { teamSelectors } from "../teamSlice";
import EditTeamDetails from "./components/EditTeamDetails";
import TeamUserRow from "./components/TeamUserRow";
import ViewTeamDetails from "./components/ViewTeamDetails";
import teamTaskColumn from "./constant/teamTaskColumn";
import userColumnFactory from "./constant/userColumnFactory";
// import TaskTableRow from "./TeamTaskTable/components/TaskTableRow";
import TeamTaskRow from "./components/TeamTaskRow";

function ViewTeam() {
  const [showWEditDetails, setShowWEditDetails] = useState(false);
  const navigate = useNavigate();
  const { teamId } = useParams();

  if (!teamId) navigate("../");

  const getTeam = useSelector((state: RootState) => teamSelectors.selectById(state, teamId || "")) as ITeam;

  const teamMember = getTeam?.members?.map((member) => member.user);

  const allTasks = useSelector((state: RootState) => tasksSelectors.selectAll(state));
  const allUsers = useSelector((state: RootState) => usersSelectors.selectAll(state));

  const allTeamsName = useSelector((state: RootState) => teamSelectors.selectAll(state))?.map((team) => team.name);

  const teamUserColumns = userColumnFactory([...allTeamsName]);

  const teamTaskData = allTasks.filter((task) => getTeam?.tasks?.includes(task?.taskId as string)) as (ITask &
    Record<string, unknown>)[];

  const getTeamUsersData = allUsers.filter((user) => teamMember?.includes(user.userId)) as (IUser &
    Record<string, unknown>)[];

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
        <TeamUserTable name="Members" data={getTeamUsersData} tableHead={teamUserColumns} TableBody={TeamUserRow} />
        {/* Add additional components for managing team tasks */}
        <TeamTaskTable name="Team Task" data={teamTaskData} tableHead={teamTaskColumn} TableBody={TeamTaskRow} />
      </Section>
    );
  }

  return content;
}
export default ViewTeam;
