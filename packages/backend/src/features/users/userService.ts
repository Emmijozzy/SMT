import { IUser } from "../../features/auth/authModel";
import { BadRequestError, InternalError, NotFoundError } from "../../utils/ApiError";
import { IPaginationOptions } from "../../utils/getPaginationOptions";
import passwordUtils from "../../utils/passwordUtils";
import { IProfileToUpdate } from "./userInterface";
import { UserRepository } from "./userRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(userData: Partial<IUser>) {
    try {
      if (!userData.email) throw new BadRequestError("Email is required");
      const foundUser = await this.userRepository.findByEmail(userData.email);
      if (foundUser) throw new BadRequestError("User already registered");

      if (!userData.password) throw new BadRequestError("Password is required");
      const hashedPassword = await passwordUtils.hash(userData.password);

      const user = await this.userRepository.create({
        ...userData,
        password: hashedPassword
      });
      return user;
    } catch (error) {
      throw new InternalError(`${error}`);
    }
  }

  public async getUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError(`User with id: ${userId} not found`);
    return user;
  }

  public async getUserByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }

  public async getAllUsers(filter: Record<string, string | number | RegExp>, paginationOption: IPaginationOptions) {
    return await this.userRepository.findAll(filter, paginationOption);
  }

  public async updateUserById(userId: string, data: IUser) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new NotFoundError("User does not exist");

    return await this.userRepository.updateById(userId, data);
  }

  public async updateProfile(userId: string, profileToUpdate: IProfileToUpdate) {
    const canUpdate = ["email", "phoneNo", "location", "whatsappLink", "facebookLink", "linkedInLink"];

    const user = (await this.getUserById(userId)) as IUser;
    if (!user.userId) throw new NotFoundError(` User with id : ${userId} not found`);

    if (!Object.keys(profileToUpdate).every((data) => canUpdate.includes(data)))
      throw new BadRequestError("Unauthorized data Update request");

    const { phoneNo, email, location, whatsappLink, facebookLink, linkedInLink } = profileToUpdate;

    const payload: Partial<IUser> = {
      ...user,
      email,
      phone_no: phoneNo,
      location,
      socialLinks: {
        whatsappLink,
        facebookLink,
        linkedInLink
      }
    };

    const updatedProfile = this.updateUserById(userId, payload as IUser);

    if (!updatedProfile) throw new InternalError("Error updating profile");
    return updatedProfile;
  }

  public async deleteUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestError("Invalid User / User does not exist");

    const deletedUser = await this.userRepository.deleteById(userId);
    if (!deletedUser?.del_flg) throw new InternalError("Fatal Error deleting user");

    return deletedUser;
  }

  public async restoreUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestError("Invalid User / User does not exist");

    const restoredUser = await this.userRepository.restoreById(userId);
    if (restoredUser?.del_flg) throw new InternalError("Fatal Error restoring user");

    return restoredUser;
  }

  public async changePassword(userId: string, { oldPassword, newPassword }: Record<string, string>) {
    if (oldPassword === newPassword) throw new BadRequestError("Old and new password cannot be the same");

    const user = await this.userRepository.findUserWithPasswordById(userId);
    if (!user) throw new NotFoundError("User does not exist");

    const match = await passwordUtils.compare(oldPassword, user.password);
    if (!match) throw new BadRequestError("Invalid old password");

    const hashedPassword = await passwordUtils.hash(newPassword);
    return await this.userRepository.updateById(userId, { password: hashedPassword });
  }

  public async outrightDeleteUserById(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new BadRequestError("Invalid User / User does not exist");

    return await this.userRepository.outrightDeleteById(userId);
  }
}
