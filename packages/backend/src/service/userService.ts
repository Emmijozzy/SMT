/* eslint-disable indent */
import ReqUserBodyData from "../Interface/reqUserBodyData";
import { IPaginationOptions } from "../utils/getPaginationOptions";
import { IUser, User } from "../features/auth/authModel";
import { BadRequestError, InternalError, NotFoundError } from "../utils/ApiError";
import passwordUtils from "../utils/passwordUtils";

const createUser = async (userData: Partial<IUser>) => {
  try {
    if (!userData.email) throw new BadRequestError("Email is required");
    const foundUser: IUser | null = await getUserByEmail(userData.email);
    if (foundUser) throw new BadRequestError("User already registered");

    if (!userData.password) throw new BadRequestError("Password is required");
    const hashedPassword = await passwordUtils.hash(userData.password);

    const user = await User.create({
      ...userData,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    throw new InternalError(`${error}`);
  }
};

export const getAll = async (
  filter: Record<string, string | number | RegExp>,
  paginationOption: IPaginationOptions
) => {
  const { limit, sortField, skip, sortOrder } = paginationOption;

  const sort = { [sortField]: sortOrder };

  const users = await User.find(filter).limit(limit).skip(skip).sort(sort).select("-password").lean().exec();

  // const total = await User.countDocuments(filter);
  // return {
  //   users,
  //   total,
  //   totalPage: Math.ceil(+total / limit) * 1,
  //   currentPage: page,
  //   hasNextPage: users.length === limit * 1,
  //   hasPreviousPage: page > 1,
  //   nextPage: page + 1,
  //   previousPage: page - 1,
  //   lastPage: Math.ceil(+total / limit)
  // };
  return users;
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email: email }).select("-password").lean().exec();
};

export const getUserByUserId = async (userId: string): Promise<IUser | null> => {
  if (!userId || !Number.parseInt(userId.slice(4))) throw new BadRequestError("Invalid User ID");

  const user = (await User.findOne({ userId: userId }).select("").lean().exec()) as IUser;

  if (!user) throw new NotFoundError(` User with id : ${userId} not found`);

  return user;
};

const canEditUser = async (userId: string, userRole: string, editedData: Partial<IUser>): Promise<boolean> => {
  const targetUserId = editedData.id;

  // Implement authorization checks based on role and edited data
  if (userRole === "admin") {
    // Admin can edit all personal data except specific properties (excluding targetUserId)
    const restrictedProps = [""]; // Assuming other properties for admins to not edit
    return userId === targetUserId || !Object.keys(editedData).some((key) => restrictedProps.includes(key));
  } else if (userRole === "manager") {
    // Manager can edit all properties except specific ones (excluding targetUserId)
    const restrictedProps = ["team", "role", "permissions", "del_flg"];
    const restrictedForOthers = ["team", "role", "profilePic", "permissions", "password"]; // Restricted for non-managers
    return (
      (userId === targetUserId &&
        !restrictedProps.some((key) => Object.prototype.hasOwnProperty.call(editedData, key))) ||
      !restrictedForOthers.some((key) => Object.prototype.hasOwnProperty.call(editedData, key))
    );
  } else if (userRole === "team_member") {
    // Team member can only edit specific properties with a value and no others
    const allowedProps = ["email", "profilePicUrl"];
    return (
      userId === targetUserId &&
      allowedProps.every((key) => Object.prototype.hasOwnProperty.call(editedData, key)) &&
      !Object.keys(editedData).some((key) => !allowedProps.includes(key))
    );
  }

  return false; // Default to not authorized
};

const editUser = async (editRequestData: Partial<IUser>) => {
  try {
    const userId = editRequestData.userId;
    delete editRequestData.userId;
    if (editRequestData.password) {
      const hashedPassword = await passwordUtils.hash(editRequestData.password);
      editRequestData.password = hashedPassword;
    }

    // console.log(editRequestData, "userId", userId);
    const updatedUser = await User.findOneAndUpdate({ userId }, editRequestData, {
      new: true
    }).select("-password");

    return updatedUser;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const updateUserById = async (userId: string, data: Record<string, string | object>) => {
  //confirm userId
  const user = await getUserByUserId(userId);
  if (!user) throw new NotFoundError("User does not exist");

  const updatedUser = await User.findOneAndUpdate({ userId }, data, {
    new: true
  }).select("-password");

  return updatedUser;
};

export const deleteByUserId = async (userId: string): Promise<IUser | null> => {
  const user: IUser | null = await getUserByUserId(userId);
  // //console.log(user);
  if (!user) throw new BadRequestError("Invalid User / User does exist");

  const deletedUser = await User.findOneAndUpdate({ userId: user.userId }, { del_flg: true }, { new: true }).select(
    "-password"
  );

  if (!deletedUser?.del_flg) throw new InternalError("Fatal Error deleting user");

  return deletedUser;
};

export const restoreByUserId = async (userId: string): Promise<IUser | null> => {
  const user: IUser | null = await getUserByUserId(userId);
  // //console.log(user);
  if (!user) throw new BadRequestError("Invalid User / User does exist");

  const restoreUser = await User.findOneAndUpdate({ userId: user.userId }, { del_flg: false }, { new: true }).select(
    "-password"
  );

  if (restoreUser?.del_flg) throw new InternalError("Fatal Error restoring user");

  return restoreUser;
};

export const sanitizeData = (data: Partial<IUser>): Partial<IUser> => {
  for (const key in data) {
    switch (key) {
      case "email":
        if (data.email) data.email = data.email.toLowerCase().trim();
        break;
      case "firstName":
        if (data.firstName) data.firstName = data.firstName.toUpperCase().trim();
        break;
      case "lastName":
        if (data.lastName) data.lastName = data.lastName.toUpperCase().trim();
        break;
    }
  }

  return data;
};

export const userDataRestructure = (reqUserData: ReqUserBodyData): Partial<IUser> => {
  const payload: Partial<IUser> = {
    userId: reqUserData.userId,
    firstName: reqUserData.firstName,
    lastName: reqUserData.lastName,
    email: reqUserData.email,
    password: reqUserData.password,
    role: reqUserData.role,
    phone_no: `${reqUserData.phoneNo}`,
    team: reqUserData.team,
    location: reqUserData.location,
    permissions: {
      can_create_tasks: reqUserData.canCreateTasks,
      can_edit_tasks: reqUserData.canEditTasks,
      can_delete_tasks: reqUserData.canDeleteTasks,
      can_view_reports: reqUserData.canViewReports,
      can_add_subtasks: reqUserData.canAddSubtasks,
      can_reassign_tasks: reqUserData.canReassignTasks,
      can_delete_users: reqUserData.canDeleteUsers,
      can_edit_users: reqUserData.canEditUsers,
      can_assign_roles: reqUserData.canAssignRole
    },
    socialLinks: {
      whatsappLink: reqUserData.whatsappLink,
      facebookLink: reqUserData.facebookLink,
      linkedInLink: reqUserData.linkedInLink
    }
  };

  return payload;
};

export default {
  getAll,
  getUserByEmail,
  getUserByUserId,
  updateUserById,
  deleteByUserId,
  restoreByUserId,
  sanitizeData,
  createUser,
  canEditUser,
  editUser,
  userDataRestructure
};
