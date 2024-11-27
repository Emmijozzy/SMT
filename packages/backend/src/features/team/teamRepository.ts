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
        throw new InternalError("Failed to create team.  ERROR: " + error.message + " ", error.stack, __filename);
      }
    }
  }
  async getTeams(): Promise<ITeam[]> {
    try {
      const teams = await Team.find({})
        .populate({
          path: "tasks",
          model: "Task",
          foreignField: "taskId"
        })
        .populate({
          path: "members",
          model: "User",
          foreignField: "userId"
        })
        .exec();
      return teams;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching teams", error);
      throw new InternalError("Failed to fetch teams.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async getTeam<T extends keyof ITeam>(object: Record<T, string>): Promise<ITeam[]> {
    try {
      const teams = await Team.find(object)
        .populate({
          path: "tasks",
          model: "Task",
          foreignField: "taskId"
        })
        .populate({
          path: "members",
          model: "User",
          foreignField: "userId"
        })
        .exec();
      return teams;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching teams", error);
      throw new InternalError("Failed to fetch teams.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async getTeamById(teamId: string): Promise<ITeam> {
    try {
      const team = await Team.findOne({ teamId })
        .populate({
          path: "tasks",
          model: "Task",
          foreignField: "taskId"
        })
        .populate({
          path: "members",
          model: "User",
          foreignField: "userId"
        })
        .exec();
      if (!team) throw new Error(`Team ${teamId} not found`);
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching team by id", error);
      throw new InternalError("Failed to fetch team by id.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
  async findTeamById(teamId: string): Promise<ITeam> {
    try {
      const team = await Team.findOne({ teamId }).exec();
      if (!team) throw new Error(`Team ${teamId} not found`);
      return team;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching team by id", error);
      throw new InternalError("Failed to fetch team by id.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async updateTeamById(teamId: string, team: IUpdateTeam): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, team, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can't be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating team by id", error);
      throw new InternalError("Failed to update team by id.  ERROR: " + error.message + " ", error.stack, __filename);
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
      throw new InternalError("Failed to delete team by id.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async addUserIDToTeam(teamId: string, userId: string): Promise<ITeam | null> {
    try {
      // console.log(teamId, "teamId");
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, { $push: { members: userId } }, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can't be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error adding user to team", error);
      throw new InternalError("Failed to add user to team.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async removeUserIDFromTeam(teamId: string, userId: string): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, { $pull: { members: userId } }, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can't be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error removing user from team", error);
      throw new InternalError(
        "Failed to remove user from team.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async addTaskIDToTeam(teamId: string, taskId: string): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, { $push: { tasks: taskId } }, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can't be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error adding task to team", error);
      throw new InternalError("Failed to add task to team.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async removeTaskIDFromTeam(teamId: string, taskId: string): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, { $pull: { tasks: taskId } }, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error removing task from team", error);
      throw new InternalError(
        "Failed to remove task from team.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async addSubtaskIDToTeam(teamId: string, subtaskId: string): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, { $push: { subtasks: subtaskId } }, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can't be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error adding subtask to team", error);
      throw new InternalError("Failed to add subtask to team.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async removeSubtaskIdFromTeam(teamId: string, subtaskId: string): Promise<ITeam | null> {
    try {
      const updatedTeam = await Team.findOneAndUpdate({ teamId }, { $pull: { subtasks: subtaskId } }, { new: true });
      if (!updatedTeam) throw new Error(`Team ${teamId} not found or can't be updated`);
      return updatedTeam;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error removing subtask from team", error);
      throw new InternalError(
        "Failed to remove subtask from team.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
}
