import { BadRequestError, InternalError } from "../../utils/ApiError";
import Subtask, { ISubtask } from "./subtask";

export default class SubtaskRepository {
  async create(subtaskData: Partial<ISubtask>): Promise<ISubtask> {
    try {
      const newSubtask = new Subtask(subtaskData);
      const subtask = await newSubtask.save();
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error creating subtask", error);

      if (error.name === "Validation") {
        throw new BadRequestError("Invalid subtask data provided");
      } else {
        throw new InternalError("Failed to create team.  ERROR: " + error.message + " ", error.stack, __filename);
      }
    }
  }
  async getSubtasks(): Promise<ISubtask[]> {
    try {
      const subtasks = await Subtask.find({}).lean().exec();
      return subtasks;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching subtasks", error);
      throw new InternalError("Failed to fetch subtasks.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
  async getSubtask<T extends keyof ISubtask>(object: Record<T, string>): Promise<ISubtask[]> {
    try {
      const subtasks = await Subtask.find(object).lean().exec();
      return subtasks;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching subtask", error);
      throw new InternalError("Failed to fetch subtask.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
  async getSubtaskById(subtaskId: string): Promise<ISubtask> {
    try {
      const subtask = await Subtask.findOne({ subtaskId }).lean().exec();
      if (!subtask) throw new Error(`Subtask ${subtaskId} not found`);
      // console.log("Subtask found:", subtask);
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching subtask by id", error);
      throw new InternalError("Failed to fetch subtask by id.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }

  async getSubtasksByTaskId(taskId: string): Promise<ISubtask[]> {
    try {
      const subtasks = await Subtask.find({ taskId }).lean().exec();
      return subtasks;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching subtasks by task id", error);
      throw new InternalError(
        "Failed to fetch subtasks by task id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async updateSubtaskById(subtaskId: string, subtask: Partial<ISubtask>): Promise<ISubtask | null> {
    try {
      const updatedSubtask = await Subtask.findOneAndUpdate({ subtaskId }, subtask, { new: true });
      if (!updatedSubtask) throw new Error(`Subtask ${subtaskId} not found or can be updated`);
      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error updating subtask by id", error);
      throw new InternalError(
        "Failed to update subtask by id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  async deleteSubtaskById(subtaskId: string): Promise<ISubtask | null> {
    try {
      const deletedSubtask = await Subtask.findOneAndDelete({ subtaskId });
      if (!deletedSubtask) throw new Error(`Subtask ${subtaskId} not found or can be deleted`);
      return deletedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting subtask by id", error);
      throw new InternalError(
        "Failed to delete subtask by id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  async deleteSubtasksByTaskId(taskId: string): Promise<void> {
    try {
      await Subtask.deleteMany({ taskId }).exec();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting subtasks by task id", error);
      throw new InternalError(
        "Failed to delete subtasks by task id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  async deleteSubtasksByUserId(userId: string): Promise<void> {
    try {
      await Subtask.deleteMany({ userId }).exec();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting subtasks by user id", error);
      throw new InternalError(
        "Failed to delete subtasks by user id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
  async deleteSubtasksByTeamId(teamId: string): Promise<void> {
    try {
      await Subtask.deleteMany({ team: teamId }).exec();
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error deleting subtasks by team id", error);
      throw new InternalError(
        "Failed to delete subtasks by team id.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async addCollaborator(subtaskId: string, collaboratorId: string): Promise<ISubtask | null> {
    try {
      const subtask = await Subtask.findOne({ subtaskId });
      if (!subtask) {
        throw new Error(`Subtask ${subtaskId} not found`);
      }
      if (subtask.collaborators.includes(collaboratorId)) {
        throw new Error(`Collaborator ${collaboratorId} already exists in subtask ${subtaskId}`);
      }
      subtask.collaborators.push(collaboratorId);
      await subtask.save();
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error adding collaborator to subtask", error);
      throw new InternalError(
        "Error adding collaborator to subtask.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async removeCollaborator(subtaskId: string, collaboratorId: string): Promise<ISubtask | null> {
    try {
      const subtask = await Subtask.findOne({ subtaskId });
      if (!subtask) {
        throw new Error(`Subtask ${subtaskId} not found`);
      }
      const collaboratorIndex = subtask.collaborators.indexOf(collaboratorId);
      if (collaboratorIndex === -1) {
        throw new Error(`Collaborator ${collaboratorId} not found in subtask ${subtaskId}`);
      }
      subtask.collaborators.splice(collaboratorIndex, 1);
      await subtask.save();
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error removing collaborator from subtask", error);
      throw new InternalError(
        "Error removing collaborator from subtask.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async addCommentId(subtaskId: string, commentId: string): Promise<ISubtask | null> {
    try {
      const subtask = await Subtask.findOne({ subtaskId });
      if (!subtask) {
        throw new Error(`Subtask ${subtaskId} not found`);
      }
      if (subtask.comments.includes(commentId)) {
        throw new Error(`Comment ${commentId} already exists in subtask ${subtaskId}`);
      }
      subtask.comments.push(commentId);
      await subtask.save();
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error adding comment to subtask", error);
      throw new InternalError(
        "Error adding comment to subtask.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }

  async removeCommentId(subtaskId: string, commentId: string): Promise<ISubtask | null> {
    try {
      const subtask = await Subtask.findOne({ subtaskId });
      if (!subtask) {
        throw new Error(`Subtask ${subtaskId} not found`);
      }
      const commentIndex = subtask.comments.indexOf(commentId);
      if (commentIndex === -1) {
        throw new Error(`Comment ${commentId} not found in subtask ${subtaskId}`);
      }
      subtask.comments.splice(commentIndex, 1);
      await subtask.save();
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error removing comment from subtask", error);
      throw new InternalError(
        "Error removing comment from subtask.  ERROR: " + error.message + " ",
        error.stack,
        __filename
      );
    }
  }
}