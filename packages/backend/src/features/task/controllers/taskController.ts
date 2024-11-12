import IController from "../../../Interface/controller";
import { Router } from "express";
// import asyncHandler from "../../../utils/asyncHandler";
// import { BadRequestError } from "../../../utils/ApiError";
// import TasksSevices from "../../../service/taskService";
// import successResponse from "../../../utils/successResponse";

export default class TaskController implements IController {
  public path = "/task";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter(): void {
    // this.router.post("/create", this.createTask);
  }
}
