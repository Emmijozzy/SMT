import TeamController from "./teamController";
import TeamRepository from "./teamRepository";
import TeamService from "./teamService";

// Dependency injection Created with the used of Factory method.
const createTeamController = (): TeamController => {
  const teamRepository = new TeamRepository();
  const teamService = new TeamService(teamRepository);
  return new TeamController(teamService);
};

export default createTeamController;
