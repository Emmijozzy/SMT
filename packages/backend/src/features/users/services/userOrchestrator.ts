import ReqUserBodyData from "../../../Interface/reqUserBodyData";
import { InternalError } from "../../../utils/ApiError";
import passwordUtils from "../../../utils/passwordUtils";
import { IUser } from "../../auth/authModel";
import TeamService from "../../team/teamService";
import { UserUtils } from "../userUtils";
import { UserService } from "./userService";

export class UserOrchestrator {
  private userService: UserService;
  private teamService: TeamService;

  constructor() {
    this.userService = new UserService();
    this.teamService = new TeamService();
  }

  public createUser = async (requestUserData: unknown) => {
    const payload = UserUtils.userDataRestructure(requestUserData as ReqUserBodyData);

    const sanitizedData = UserUtils.sanitizeUserData(payload);

    const getTeam = await this.teamService.getTeamById(sanitizedData.teamId as string);
    if (!getTeam) throw new InternalError("Team not found");
    sanitizedData.team = getTeam.name;

    const user = await this.userService.createUser(sanitizedData);

    const userAddedToTeam = await this.teamService.addUserID(sanitizedData.teamId as string, user.userId as string);

    if (!userAddedToTeam) throw new InternalError("User not added to team");
    if (!user) throw new InternalError("User not created");

    return user;
  };

  public updateUser = async (
    requestingUserId: string,
    requestingUserRole: string,
    requestUserData: ReqUserBodyData
  ) => {
    const payload = UserUtils.userDataRestructure(requestUserData as ReqUserBodyData);
    const sanitizedData = UserUtils.sanitizeUserData(payload);

    const isAuthorized = await UserUtils.canEditUser(requestingUserId, requestingUserRole, sanitizedData);
    if (!isAuthorized) throw new InternalError("Unauthorized to edit user");

    const getUser = await this.userService.getUserById(sanitizedData.userId as string);

    //check if password is to be update to hash before Update
    if (sanitizedData.password) {
      const hashedPassword = await passwordUtils.hash(sanitizedData.password);
      sanitizedData.password = hashedPassword;
    }

    const getTeam = await this.teamService.getTeamById(sanitizedData.teamId as string);
    if (!getTeam) throw new InternalError("Team not found");
    sanitizedData.team = getTeam.name;

    // Check if User team has been change to also update team members
    if (sanitizedData.teamId && sanitizedData.teamId !== getUser.teamId) {
      const getPreviousTeam = await this.teamService.getTeamById(getUser.teamId as string);
      if (!getPreviousTeam) throw new InternalError("Previous team not found");
      const updatePreviousTeam = await this.teamService.removeUserID(
        getPreviousTeam.teamId as string,
        sanitizedData.userId as string
      );
      if (!updatePreviousTeam) throw new InternalError("Failed to update user's previous team members");

      const NewTeam = await this.teamService.getTeamById(sanitizedData.teamId as string);
      if (!NewTeam) throw new InternalError("Team not found");
      const updatedTeamMembers = await this.teamService.addUserID(
        sanitizedData.teamId as string,
        sanitizedData.userId as string
      );
      if (!updatedTeamMembers) throw new InternalError("Failed to update user new team members");
    }
    const user = await this.userService.updateUserById(sanitizedData.userId as string, sanitizedData as IUser);

    if (!user) throw new InternalError("User not updated");
    return user;
  };
}
