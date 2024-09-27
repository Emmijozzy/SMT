import { IUser, User } from "../features/auth/authModel";
import { ITask, Task } from "../features/task/model/task";
import { TaskPayload } from "../features/task/tasksInterface";
import createTaskId from "../features/task/utils/createTaskId";
import { ApiError, BadRequestError, InternalError } from "../utils/ApiError";
import { IPaginationOptions } from "../utils/getPaginationOptions";

export const createTask = async (Payload: TaskPayload): Promise<ITask> => {
  const { title, description, responsibleTeam, priority, dueDate, startDate, managerTask, managerId } = Payload;
  // const team = (await TeamModel.findOne({ teamId: responsibleTeam })) as ITeam;
  // if (!team) throw new InternalError("Error in fetching team");

  const taskId = await createTaskId();
  if (!taskId) throw new InternalError("Error in creating task Id ");

  let manager: IUser | string;
  let taskPayload;

  if (managerTask && !managerId) {
    throw new BadRequestError("Manager Id is required");
  } else if (managerTask && managerId) {
    manager = (await User.findOne({ userId: managerId })) as IUser;
    if (manager?.role != "manager") throw new BadRequestError("Invalid Manager ID");
    taskPayload = {
      taskId,
      title: title.trim(),
      description: description?.trim(),
      responsibleTeam: responsibleTeam /* * Change back to: responsibleTeam: team.teamId  */,
      priority,
      dueDate,
      startDate,
      managerTask,
      managerId: manager.userId ? manager.userId : ""
    };
  } else {
    taskPayload = {
      taskId,
      title: title.trim(),
      description: description?.trim(),
      responsibleTeam: responsibleTeam /* * Change back to: responsibleTeam: team.teamId  */,
      priority,
      dueDate,
      startDate
    };
  }

  let task = new Task(taskPayload);
  task = await task.save();

  if (!task.taskId) throw new InternalError("Error create new task");

  return task;
};

export const getAll = async (
  filter: Record<string, string | number | RegExp>,
  paginationObption: IPaginationOptions
): Promise<ITask[]> => {
  const { limit, sortField, skip, sortOrder } = paginationObption;

  const sort = { [sortField]: sortOrder };

  const tasks = await Task.find(filter).limit(limit).skip(skip).sort(sort).select("-password").lean().exec();

  return tasks;
};

export const getTaskById = async (taskId: string) => {
  if (!taskId) throw new BadRequestError("Task Id is required");
  const task = (await Task.find({ taskId }).lean().exec())[0] as ITask;
  return task;
};

export const updateTaskById = async (task: TaskPayload): Promise<ITask | null> => {
  try {
    const updatedTask = await Task.findOneAndUpdate({ taskId: task.taskId }, task, { new: true });

    if (updatedTask && typeof updatedTask?.taskId != "string") throw new InternalError("Error Updating task");

    return updatedTask;
  } catch (error: unknown) {
    const err = error as ApiError;
    throw new InternalError(`Error while updating task ${err.message}`);
  }
};

export const deleteTaskById = async (taskId: string): Promise<ITask | null> => {
  const task: ITask | null = await getTaskById(taskId);

  if (!task) throw new BadRequestError(`Invalid Task ${taskId}, task does not exist `);

  const deletedTask = await Task.findOneAndUpdate({ taskId: task.taskId }, { del_flg: true }, { new: true });

  if (!deletedTask) throw new InternalError(`Error deleting task ${taskId}`);

  return deletedTask;
};

export const restoreTaskById = async (taskId: string): Promise<ITask | null> => {
  const task: ITask | null = await getTaskById(taskId);

  if (!task) throw new BadRequestError(`Invalid Task ${taskId}, task does not exist `);

  const restoredTask = await Task.findOneAndUpdate({ taskId: task.taskId }, { del_flg: false }, { new: true });

  if (!restoredTask) throw new InternalError(`Error deleting task ${taskId}`);

  return restoredTask;
};

export default {
  createTask,
  getAll,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  restoreTaskById
};
