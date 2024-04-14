import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import IController from "../../Interface/controller";
import asyncHandler from "../../utils/asyncHandler";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import { ICreateTeam } from "./interface";
import TeamModel from "./model";

export default class TeamController implements IController {
  public path = "/team";
  public router = Router();

  constructor() {
    this.initializeRouter();
    console.log(this.path);
  }

  private initializeRouter(): void {
    this.router.post("/create", this.create);
  }

  private create = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, managerId, memberIds }: ICreateTeam = req.body;

    if (!name || !description || !managerId || memberIds.length < 1) throw new BadRequestError("Missing data required");

    let teamId = "";
    if (!teamId) {
      teamId = uuidv4().substring(0, 5);
      console.log(teamId);
    }

    const teamPaylaod = {
      teamId,
      name,
      description,
      memberIds,
      managerId
    };

    const team = await TeamModel.create(teamPaylaod);

    if (!team) throw new InternalError("Error creating team");

    res.status(200).json({ teamId: team.teamId, team: team });
  });
}
