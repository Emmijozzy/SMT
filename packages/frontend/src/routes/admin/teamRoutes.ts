import { lazy } from "react";

const Teams = lazy(() => import("../../features/teams/Team"));
const TeamTable = lazy(() => import("../../features/teams/teamTable/TeamTable"));
const CreateTeam = lazy(() => import("../../features/teams/createTeam/CreateTeam"));
const ViewTeam = lazy(() => import("../../features/teams/viewTeam/ViewTeam"));
const ViewUser = lazy(() => import("../../features/users/viewUser/ViewUser"));
const EditUser = lazy(() => import("../../features/users/EditUser/EditUser"));

export const teamRoutes = {
  path: "dash/teams",
  component: Teams,
  children: [
    { index: true, component: TeamTable },
    { path: "create_team", component: CreateTeam },
    { path: ":teamId", component: ViewTeam },
    { path: ":teamId/users/:userId/view", component: ViewUser },
    { path: ":teamId/users/:userId/edit", component: EditUser },
  ],
};
