import { BadRequestError, InternalError } from "../../utils/ApiError";
import { ICreateTeam, IUpdateTeam } from "./teamInterface";
import Team, { ITeam } from "./teamModel";

export default class TeamRepository {
  async create(TeamData: ICreateTeam): Promise<ITeam> {
    try {
      const newTeam = new Team(TeamData);
      const team = await newTeam.save();
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating team", error);

      if (error.name === "Validation") {
        throw new BadRequestError("Invalid team data provided");
      } else {
        throw new InternalError("Failed to create team.  ERROR: " + error.message + " " + error.stack);
      }
    }
  }
  async getTeams(): Promise<ITeam[]> {
    try {
      const teams = await Team.find({}).lean().exec();
      return teams;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching teams", error);
      throw new InternalError("Failed to fetch teams.  ERROR: " + error.message);
    }
  }

  async getTeamById(teamId: string): Promise<ITeam> {
    try {
      const team = await Team.find({ teamId }).lean().exec();
      if (!team) throw new Error(`Team ${teamId} not found`);
      return team[0];
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching team by id", error);
      throw new InternalError("Failed to fetch team by id.  ERROR: " + error.message);
    }
  }

  async updateTeamById(teamId: string, team: IUpdateTeam): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, team, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating team by id", error);
      throw new InternalError("Failed to update team by id.  ERROR: " + error.message);
    }
  }

  async deleteTeamById(teamId: string): Promise<ITeam | null> {
    try {
      const deletedTeam = await Team.findOneAndDelete({ teamId });
      if (!deletedTeam) throw new Error(`Team ${teamId} not found`);
      return deletedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting team by id", error);
      throw new InternalError("Failed to delete team by id.  ERROR: " + error.message);
    }
  }
}
