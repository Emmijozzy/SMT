import { IPaginationOptions } from "../../utils/getPaginationOptions";
import { InternalError } from "../../utils/ApiError";
import { ISubtask } from "./subtask";
import SubtaskRepository from "./subtaskRepository";

export default class SubtaskService {
  private subtaskRepository: SubtaskRepository;
  constructor() {
    this.subtaskRepository = new SubtaskRepository();
  }
  async create(subtaskData: Partial<ISubtask>, requesterUserId: string): Promise<ISubtask> {
    try {
      const payload = {
        ...subtaskData,
        title: subtaskData.title?.trim(),
        description: subtaskData.description?.trim(),
        createdBy: requesterUserId
      };

      const subtask = await this.subtaskRepository.create(payload);
      if (!subtask) throw new InternalError("Failed to create subtask");
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to create subtask ERR:" + error.message, "", __filename);
    }
  }

  async getSubtasks(filter: Record<string, unknown>, paginationOption: IPaginationOptions): Promise<ISubtask[]> {
    try {
      const subtasks = await this.subtaskRepository.getSubtasks(filter, paginationOption);
      if (!subtasks) throw new InternalError("Failed to fetch subtasks");
      return subtasks;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch subtasks ERR:" + error.message, "", __filename);
    }
  }

  async getSubtaskById(subtaskId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      return subtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch subtask ERR:" + error.message, "", __filename);
    }
  }

  async updateSubtaskById(
    subtaskId: string,
    subtaskData: Partial<ISubtask>,
    requestUserId: string
  ): Promise<ISubtask | null> {
    try {
      const { title, description, status, dueDate, assignee } = subtaskData;
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const payload: Partial<ISubtask> = {
        title: title?.trim(),
        description: description?.trim(),
        status: status as "open" | "pending" | "complete" | undefined,
        dueDate: dueDate,
        assignee: assignee?.trim(),
        lastModifiedBy: requestUserId,
        updatedAt: new Date(Date.now())
      };
      const updatedSubtask = await this.subtaskRepository.updateSubtaskById(subtaskId, payload);
      if (!updatedSubtask) throw new InternalError("Failed to update subtask");
      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask ERR:" + error.message, "", __filename);
    }
  }

  async deleteSubtaskById(subtaskId: string): Promise<boolean> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const deletedSubtask = await this.subtaskRepository.deleteSubtaskById(subtaskId);
      if (!deletedSubtask) throw new InternalError("Failed to delete subtask");
      return true;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to delete subtask ERR:" + error.message, "", __filename);
    }
  }

  async getSubtasksByTaskId(taskId: string): Promise<ISubtask[]> {
    try {
      const subtasks = await this.subtaskRepository.getSubtask({ taskId });
      if (!subtasks) throw new InternalError("Failed to fetch subtasks");
      return subtasks;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch subtasks ERR:" + error.message, "", __filename);
    }
  }

  async getSubtaskByAssignee(assignee: string): Promise<ISubtask[]> {
    try {
      const subtasks = await this.subtaskRepository.getSubtask({ assignee });
      if (!subtasks) throw new InternalError("Failed to fetch subtasks");
      return subtasks;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to fetch subtasks ERR:" + error.message, "", __filename);
    }
  }
  async addCollaborator(subtaskId: string, collaboratorId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const collaborator = await this.subtaskRepository.addCollaborator(subtaskId, collaboratorId);
      if (!collaborator) throw new InternalError("Failed to add collaborator");
      return collaborator;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to add collaborator ERR:" + error.message, "", __filename);
    }
  }

  async removeCollaborator(subtaskId: string, collaboratorId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const collaborator = await this.subtaskRepository.removeCollaborator(subtaskId, collaboratorId);
      if (!collaborator) throw new InternalError("Failed to remove collaborator");
      return collaborator;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to remove collaborator ERR:" + error.message, "", __filename);
    }
  }

  async addCommentId(commentId: string, subtaskId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const comment = await this.subtaskRepository.addCommentId(commentId, subtaskId);
      if (!comment) throw new InternalError("Failed to add comment");
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to add comment ERR:" + error.message, "", __filename);
    }
  }
  async removeCommentId(commentId: string, subtaskId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const comment = await this.subtaskRepository.removeCommentId(commentId, subtaskId);
      if (!comment) throw new InternalError("Failed to remove comment");
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to remove comment ERR:" + error.message, "", __filename);
    }
  }
}
