import { BadRequestError, InternalError, NotFoundError } from "../../utils/ApiError";
import { ICreateTeam, IUpdateTeam } from "./teamInterface";
import { ITeam } from "./teamModel";
import TeamRepository from "./teamRepository";

export default class TeamService {
  private teamRepository: TeamRepository;
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  async createTeam(teamData: ICreateTeam): Promise<ITeam> {
    try {
      const { name } = teamData;
      const teamWithName = await this.teamRepository.getTeam({ name: name });
      if (teamWithName.length > 0) throw new BadRequestError("Team with the same name already exists", "", __filename);
      const team = await this.teamRepository.create(teamData);
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not create team ERR:" + error.message, "", __filename);
    }
  }

  async getTeams(): Promise<ITeam[]> {
    try {
      const teams = await this.teamRepository.getTeams();
      return teams;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not fetch teams ERR:" + error.message, "", __filename);
    }
  }
  async getTeamById(teamId: string): Promise<ITeam | null> {
    try {
      const team = await this.teamRepository.getTeamById(teamId);
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not fetch team ERR:" + error.message, "", __filename);
    }
  }

  async updateTeamById(teamId: string, teamData: IUpdateTeam): Promise<ITeam | null> {
    try {
      const { name, description, managerId, tasks, subTasks, members } = teamData;
      const team = await this.teamRepository.getTeamById(teamId);

      if (!team) {
        throw new NotFoundError("Team not found");
      }

      const updatedTeam = await this.teamRepository.updateTeamById(teamId, {
        name,
        description,
        managerId,
        tasks,
        subTasks,
        members,
        updatedAt: new Date()
      });

      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not update team ERR:" + error.message, "", __filename);
    }
  }

  async deleteTeamById(teamId: string): Promise<ITeam | null> {
    try {
      const team = await this.teamRepository.getTeamById(teamId);

      if (!team) {
        throw new NotFoundError("Team not found");
      }

      const deletedTeam = await this.teamRepository.deleteTeamById(teamId);

      return deletedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not delete team ERR:" + error.message, "", __filename);
    }
  }

  async addUserID(teamId: string, userId: string): Promise<boolean> {
    try {
      const team = await this.teamRepository.findTeamById(teamId);
      if (!team) {
        throw new NotFoundError("Team not found");
      }
      const ifUserExists = team.members?.find((member) => member === userId);
      if (ifUserExists) {
        throw new BadRequestError("User already exists in the team");
      }
      // console.log(userId, "user id", team.name);
      const updatedTeam = await this.teamRepository.addUserIDToTeam(teamId, userId);
      if (updatedTeam) {
        return true;
      } else {
        throw new InternalError("Failed to add user to team");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to add user to team. ERROR: " + error.message, error.stack, __filename);
    }
  }

  async removeUserID(teamId: string, userId: string): Promise<boolean> {
    try {
      const team = (await this.teamRepository.findTeamById(teamId)) as ITeam;
      if (!team) {
        throw new NotFoundError("Team not found");
      }

      // console.log(userId, "user id", team.name);

      const ifUserExists = team.members?.find((member) => member === userId);
      if (!ifUserExists) {
        throw new BadRequestError("User does not exist in the team");
      }
      const updatedTeam = await this.teamRepository.removeUserIDFromTeam(teamId, userId);
      if (updatedTeam) {
        return true;
      } else {
        throw new InternalError("Failed to remove user from team");
      }
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to remove user from team. ERROR: " + error.message, error.stack, __filename);
    }
  }
}
