import { Request, Response, Router } from "express";
import IController from "../../Interface/controller";
import validationMiddleware from "../../middleware/validationMiddleware";
import { BadRequestError, InternalError } from "../../utils/ApiError";
import asyncHandler from "../../utils/asyncHandler";
import successResponse from "../../utils/successResponse";
import { ICreateTeam } from "./teamInterface";
import TeamService from "./teamService";
import teamValidation from "./teamValidation";

export default class TeamController implements IController {
  public path = "/team";
  public router = Router();
  private _teamService: TeamService;

  constructor(teamService: TeamService) {
    this._teamService = teamService;
    this.initializeRouter();
    //console.log(this.path);
  }

  private initializeRouter(): void {
    this.router.post("/create", validationMiddleware(teamValidation.teamSchema), this.create);
    this.router.get("/teams", this.getTeams);
    this.router.get("/", this.getTeam);
    this.router.patch("/", validationMiddleware(teamValidation.teamSchema), this.updateTeam);
    this.router.delete("/", this.deleteTeam);
  }

  private create = asyncHandler(async (req: Request, res: Response) => {
    const { name, description, managerId }: ICreateTeam = req.body;

    const teamPayload = {
      name,
      description,
      managerId
    };

    const team = await this._teamService.createTeam(teamPayload);

    if (!team) throw new InternalError("Error creating team");

    successResponse(res, {
      data: team,
      message: "New team created successfully"
    });
  });

  private getTeams = asyncHandler(async (_req: Request, res: Response) => {
    const teams = await this._teamService.getTeams();

    if (teams == null || teams.length === 0) throw new InternalError("Error fetching teams");
    successResponse(res, {
      data: teams,
      message: "Teams retrieved successfully"
    });
  });

  private getTeam = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id;
    console.log(id);
    if (!id) throw new BadRequestError("Team ID is required");

    const team = await this._teamService.getTeamById(id as string);
    if (!team) throw new InternalError("Error fetching team");
    successResponse(res, {
      data: team,
      message: "Team retrieved successfully"
    });
  });

  private updateTeam = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id;

    console.log(id);
    const { name, description, managerId, tasks, subTasks, members } = req.body;

    if (!id) throw new BadRequestError("Team ID is required");

    const payload = {
      name,
      description,
      managerId,
      tasks,
      subTasks,
      members
    };

    console.log(payload);

    const updatedTeam = await this._teamService.updateTeamById(id as string, payload);

    if (!updatedTeam) throw new InternalError("Error updating team");

    successResponse(res, {
      data: updatedTeam,
      message: "Team updated successfully"
    });
  });

  private deleteTeam = asyncHandler(async (req: Request, res: Response) => {
    const id = req.query.id;
    console.log(id);
    if (!id) throw new BadRequestError("Team ID is required");
    const deletedTeam = await this._teamService.deleteTeamById(id as string);
    if (!deletedTeam) throw new InternalError("Error deleting team");

    successResponse(res, {
      data: deletedTeam,
      message: "Team deleted successfully"
    });
  });
}
