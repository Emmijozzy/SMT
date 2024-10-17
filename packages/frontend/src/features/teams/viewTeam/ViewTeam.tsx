import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../app/store";
import Section from "../../../shared/components/Section";
import { ITeam } from "../teamInterface";
import { teamSelectors } from "../teamSlice";
import EditTeamDetails from "./components/EditTeamDetails";
import ViewTeamDetails from "./components/ViewTeamDetails";
import TeamUsersTable from "./TeamUserTable/TeamUsersTable";

function ViewTeam() {
  const [showWEditDetails, setShowWEditDetails] = useState(false);
  const navigate = useNavigate();
  const { teamId } = useParams();

  if (!teamId) navigate("../");

  const getTeam = useSelector((state: RootState) => teamSelectors.selectById(state, teamId || "")) as ITeam;

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
        {getTeam.members && <TeamUsersTable users={getTeam.members} />}
        {/* Add additional components for managing team tasks */}
      </Section>
    );
  }

  return content;
}
export default ViewTeam;
