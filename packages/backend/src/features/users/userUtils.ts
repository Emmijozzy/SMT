/* eslint-disable indent */
import { IUser } from "features/auth/authModel";
import ReqUserBodyData from "Interface/reqUserBodyData";

export class UserUtils {
  static canEditUser = async (userId: string, userRole: string, editedData: Partial<IUser>): Promise<boolean> => {
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

  static userDataRestructure = (reqUserData: ReqUserBodyData): Partial<IUser> => {
    const payload: Partial<IUser> = {
      userId: reqUserData.userId,
      firstName: reqUserData.firstName,
      lastName: reqUserData.lastName,
      email: reqUserData.email,
      password: reqUserData.password,
      role: reqUserData.role,
      phone_no: `${reqUserData.phoneNo}`,
      team: reqUserData.team,
      teamId: reqUserData.teamId,
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

  static sanitizeUserData = (data: Partial<IUser>): Partial<IUser> => {
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
}
