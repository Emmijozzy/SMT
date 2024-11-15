import { BadRequestError, InternalError, NotFoundError } from "../../../utils/ApiError";
import { IPaginationOptions } from "../../../utils/getPaginationOptions";
import { IUser, User } from "../../auth/authModel";
import { ITask } from "../model/task";
import { TaskRepository } from "../taskRepository";
import { TaskPayload } from "../tasksInterface";
import createTaskId from "../utils/createTaskId";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = new TaskRepository();
  }

  public async createTask(payload: TaskPayload): Promise<ITask> {
    const { title, description, responsibleTeam, priority, dueDate, startDate, managerTask, managerId } = payload;
    if (!title?.trim() || !description?.trim() || !responsibleTeam || !dueDate)
      throw new BadRequestError("Incomplete data provided");

    const taskId = await createTaskId();
    if (!taskId) throw new InternalError("Error in creating task Id");

    let manager: IUser | string;
    let taskPayload: Partial<ITask>;

    if (managerTask) {
      if (!managerId) throw new BadRequestError("Manager Id is required");

      manager = (await User.findOne({ userId: managerId })) as IUser;
      if (!manager || manager.role !== "manager") throw new BadRequestError("Invalid Manager ID");

      taskPayload = {
        taskId,
        title: title.trim(),
        description: description?.trim(),
        responsibleTeam,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        startDate: new Date(startDate),
        managerTask,
        managerId: manager.userId
      };
    } else {
      taskPayload = {
        taskId,
        title: title.trim(),
        description: description?.trim(),
        responsibleTeam,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        startDate: new Date(startDate)
      };
    }

    const task = await this.taskRepository.create(taskPayload);
    if (!task.taskId) throw new InternalError("Error creating new task");

    return task;
  }
  public async getAll(
    filter: Record<string, string | number | RegExp>,
    paginationOption: IPaginationOptions,
    populateOptions?: { path: string; model: string; select: string }[]
  ): Promise<ITask[]> {
    return await this.taskRepository.findAll(filter, paginationOption, populateOptions);
  }

  public async getTaskById(
    taskId: string,
    populateOptions?: { path: string; model: string; select: string }[]
  ): Promise<ITask> {
    if (!taskId) throw new BadRequestError("Task Id is required");
    const task = await this.taskRepository.findById(taskId, populateOptions);
    if (!task) throw new NotFoundError(`Task with id: ${taskId} not found`);
    return task;
  }

  public async updateTaskById(taskId: string, taskPayload: Partial<ITask>): Promise<ITask | null> {
    try {
      const updatedTask = await this.taskRepository.updateById(taskId, taskPayload);
      if (!updatedTask || typeof updatedTask.taskId !== "string") throw new InternalError("Error Updating task");
      return updatedTask;
    } catch (error: unknown) {
      const err = error as Error;
      throw new InternalError(`Error while updating task: ${err.message}`);
    }
  }

  public async deleteTaskById(taskId: string): Promise<ITask | null> {
    const task = await this.getTaskById(taskId);
    if (!task) throw new BadRequestError(`Invalid Task ${taskId}, task does not exist`);

    const deletedTask = await this.taskRepository.deleteById(taskId);
    if (!deletedTask) throw new InternalError(`Error deleting task ${taskId}`);

    return deletedTask;
  }

  public async restoreTaskById(taskId: string): Promise<ITask | null> {
    const task = await this.getTaskById(taskId);
    if (!task) throw new BadRequestError(`Invalid Task ${taskId}, task does not exist`);

    const restoredTask = await this.taskRepository.restoreById(taskId);
    if (!restoredTask) throw new InternalError(`Error restoring task ${taskId}`);

    return restoredTask;
  }

  public async outrightDeleteById(taskId: string): Promise<ITask | null> {
    try {
      const deletedTask = await this.taskRepository.outrightDeleteById(taskId);
      if (!deletedTask) throw new InternalError(`Error deleting task ${taskId}`);
      return deletedTask;
    } catch (err: unknown) {
      const error = err as Error;
      console.error("Error fetching teams", error);
      throw new InternalError("Failed to delete task.  ERROR: " + error.message + " ", error.stack, __filename);
    }
  }
}
