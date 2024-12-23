import { lazy } from "react";

const Teams = lazy(() => import("../../features/teams/Team"));
const TeamTable = lazy(() => import("../../features/teams/teamTable/TeamTable"));
const CreateTeam = lazy(() => import("../../features/teams/createTeam/CreateTeam"));
const ViewTeam = lazy(() => import("../../features/teams/viewTeam/ViewTeam"));

export const teamRoutes = {
  path: "dash/teams",
  component: Teams,
  children: [
    { index: true, component: TeamTable },
    { path: "create_team", component: CreateTeam },
    { path: ":teamId", component: ViewTeam },
  ],
};
