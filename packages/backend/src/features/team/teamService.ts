import { InternalError, NotFoundError } from "../../utils/ApiError";
import { ICreateTeam, IUpdateTeam } from "./teamInterface";
import { ITeam } from "./teamModel";
import TeamRepository from "./teamRepository";

export default class TeamService {
  private _teamRepository: TeamRepository;
  constructor(teamRepository: TeamRepository) {
    this._teamRepository = teamRepository;
  }

  async createTeam(teamData: ICreateTeam): Promise<ITeam> {
    try {
      // *TODO - re-consider the internal logic validation here
      const team = await this._teamRepository.create(teamData);
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not create team ERR:" + error.message);
    }
  }

  async getTeams(): Promise<ITeam[]> {
    try {
      const teams = await this._teamRepository.getTeams();
      return teams;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not fetch teams ERR:" + error.message);
    }
  }
  async getTeamById(teamId: string): Promise<ITeam | null> {
    try {
      const team = await this._teamRepository.getTeamById(teamId);
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not fetch team ERR:" + error.message);
    }
  }

  async updateTeamById(teamId: string, teamData: IUpdateTeam): Promise<ITeam | null> {
    try {
      const { name, description, managerId, tasks, subTasks, members } = teamData;
      const team = await this._teamRepository.getTeamById(teamId);

      if (!team) {
        throw new NotFoundError("Team not found");
      }

      const updatedTeam = await this._teamRepository.updateTeamById(teamId, {
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
      throw new InternalError("Could not update team ERR:" + error.message);
    }
  }

  async deleteTeamById(teamId: string): Promise<ITeam | null> {
    try {
      const team = await this._teamRepository.getTeamById(teamId);

      if (!team) {
        throw new NotFoundError("Team not found");
      }

      const deletedTeam = await this._teamRepository.deleteTeamById(teamId);

      return deletedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Could not delete team ERR:" + error.message);
    }
  }
}
