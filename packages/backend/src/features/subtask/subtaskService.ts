import { BadRequestError, InternalError } from "../../utils/ApiError";
import { IPaginationOptions } from "../../utils/getPaginationOptions";
import { ISubtask } from "./subtask";
import { InReviewFeedBackData, InReviewUpdateData } from "./subtaskInterfaces";
import SubtaskRepository from "./subtaskRepository";
import { SubtaskStatus } from "./SubtaskStatus";

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
        status: status as "open" | "in_process" | "in_review" | "revisit" | "completed" | undefined,
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

  async addCommentId(subtaskId: string, commentId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const comment = await this.subtaskRepository.addCommentId(subtaskId, commentId);
      if (!comment) throw new InternalError("Failed to add comment");
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to add comment ERR:" + error.message, "", __filename);
    }
  }
  async removeCommentId(subtaskId: string, commentId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const comment = await this.subtaskRepository.removeCommentId(subtaskId, commentId);
      if (!comment) throw new InternalError("Failed to remove comment");
      return comment;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to remove comment ERR:" + error.message, "", __filename);
    }
  }

  async updateSubtaskStatus(subtaskId: string, newStatus: SubtaskStatus): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      if (!this.isValidTransition(subtask.status as SubtaskStatus, newStatus)) {
        throw new InternalError("Invalid status transition");
      }
      const updatedSubtask = await this.subtaskRepository.updateSubtaskStatus(subtaskId, newStatus);
      if (!updatedSubtask) throw new InternalError("Failed to update subtask status");
      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }

  async updateSubtaskFromOpenToInProcess(subtaskId: string): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      if (subtask.status !== SubtaskStatus.Open) {
        throw new InternalError("Subtask is not in the 'Open' status");
      }
      if (!this.isValidTransition(subtask.status as SubtaskStatus, SubtaskStatus.InProcess)) {
        throw new InternalError("Invalid status transition");
      }
      const updatedSubtask = await this.subtaskRepository.updateSubtaskStatus(subtaskId, SubtaskStatus.InProcess);
      if (!updatedSubtask) throw new InternalError("Failed to update subtask status");
      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }

  async updateSubtaskFromToInReview(
    subtaskId: string,
    inReviewUpdateData: InReviewUpdateData
  ): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");

      const { checkLists } = inReviewUpdateData;
      const allChecked = checkLists.every((checklist) => checklist.isChecked);
      if (!allChecked) {
        throw new BadRequestError("All checklists must be checked before moving to InReview");
      }

      if (subtask.status !== SubtaskStatus.InProcess && subtask.status !== SubtaskStatus.Revisit) {
        throw new BadRequestError("Subtask is not in the 'InProcess' or 'Revisit' status");
      }
      if (!this.isValidTransition(subtask.status as SubtaskStatus, SubtaskStatus.InReview)) {
        throw new InternalError("Invalid status transition");
      }

      const updatedSubtask = await this.subtaskRepository.updateSubtask(subtaskId, {
        ...inReviewUpdateData,
        status: SubtaskStatus.InReview
      });
      if (!updatedSubtask) throw new InternalError("Failed to update subtask status");
      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }
  async updateSubtaskFromInReviewToRevisit(
    subtaskId: string,
    revisitUpdateData: InReviewFeedBackData
  ): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) {
        throw new InternalError("Failed to fetch subtask");
      }

      const { checkLists } = revisitUpdateData;
      const allChecked = checkLists.every((checklist) => checklist.isChecked);
      const atLeastOneRejected = checkLists.some((checklist) => !checklist.isApprove);

      if (!allChecked) {
        throw new BadRequestError("All checklists must checked, cannot revisit");
      }

      if (!atLeastOneRejected) {
        throw new BadRequestError("Cannot revisit when all checklists are approved");
      }

      if (subtask.status !== SubtaskStatus.InReview) {
        throw new BadRequestError(`Invalid status transition: Current status is ${subtask.status}`);
      }

      if (!this.isValidTransition(subtask.status as SubtaskStatus, SubtaskStatus.Revisit)) {
        throw new BadRequestError("Invalid status transition to Revisit");
      }
      const updatedSubtask = await this.subtaskRepository.updateSubtask(subtaskId, {
        ...revisitUpdateData,
        feedback: revisitUpdateData.feedback,
        status: SubtaskStatus.Revisit
      });

      return updatedSubtask ?? null;
    } catch (err) {
      const error = err as Error;
      console.error(`Subtask revisit failed: ${error.message}`);
      throw new InternalError(`Failed to update subtask status: ${error.message}`, "", __filename);
    }
  }

  async updateSubtaskFromInReviewToCompleted(
    subtaskId: string,
    completedUpdateData: InReviewFeedBackData
  ): Promise<ISubtask | null> {
    try {
      const subtask = await this.subtaskRepository.getSubtaskById(subtaskId);
      if (!subtask) throw new InternalError("Failed to fetch subtask");
      const { checkLists } = completedUpdateData;
      const allChecked = checkLists.every((checklist) => checklist.isChecked);
      const allApproved = checkLists.every((checklist) => checklist.isApprove);

      if (!allChecked) {
        throw new BadRequestError("All checklists must be checked before completing");
      }

      if (!allApproved) {
        throw new BadRequestError("All checklists must be approved before completing");
      }

      if (subtask.status !== SubtaskStatus.InReview) {
        throw new InternalError("Subtask is not in the 'InReview' status");
      }

      if (!this.isValidTransition(subtask.status as SubtaskStatus, SubtaskStatus.Completed)) {
        throw new InternalError("Invalid status transition");
      }

      const updatedSubtask = await this.subtaskRepository.updateSubtask(subtaskId, {
        ...completedUpdateData,
        status: SubtaskStatus.Completed
      });

      if (!updatedSubtask) throw new InternalError("Failed to update subtask status");
      return updatedSubtask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error.message);
      throw new InternalError("Failed to update subtask status ERR:" + error.message, "", __filename);
    }
  }

  private isValidTransition(currentStatus: SubtaskStatus, newStatus: SubtaskStatus): boolean {
    const allowedTransitions: Record<SubtaskStatus, SubtaskStatus[]> = {
      [SubtaskStatus.Open]: [SubtaskStatus.InProcess],
      [SubtaskStatus.InProcess]: [SubtaskStatus.InReview],
      [SubtaskStatus.InReview]: [SubtaskStatus.Completed, SubtaskStatus.Revisit],
      [SubtaskStatus.Revisit]: [SubtaskStatus.Completed, SubtaskStatus.InReview],
      [SubtaskStatus.Completed]: []
    };
    return allowedTransitions[currentStatus]?.includes(newStatus) || false;
  }
}
