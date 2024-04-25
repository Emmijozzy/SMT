import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import IController from "../../../Interface/controller";
import { Router, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { BadRequestError, InternalError } from "../../../utils/ApiError";
import { Task } from "../model/task";
import TeamModel, { ITeam } from "../../team/teamModel";
import createTaskId from "../utils/createTaskId";
import { User } from "../../auth/model";

export default class TaskController implements IController {
  public path = "/task";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.post("/create", this.createTask);
  }

  private createTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, responsibleTeam, priority, dueDate, managerTask, managerId } = req.body;
    if (!title.trim() || !description.trim() || !responsibleTeam || !dueDate)
      throw new BadRequestError("Incomplete data provided");

    if (managerTask && !managerId) throw new BadRequestError("Manager Id is required");

    const manager = await User.findOne({ userId: managerId });
    if (manager?.role != "manager") throw new BadRequestError("Invalid Manager ID");

    const taskId = await createTaskId();
    if (!taskId) throw new InternalError("Error in creating task Id ");

    const team = await TeamModel.findOne({ teamId: responsibleTeam });
    if (!team) throw new InternalError("Error in fetching team");

    const taskPayload = {
      taskId,
      title: title.trim(),
      description: description.trim(),
      responsibleTeam: team.teamId,
      priority,
      dueDate,
      managerTask,
      managerId: manager.userId
    };

    let task = new Task(taskPayload);
    task = await task.save();
    res.status(200).json(task);
  });
}
