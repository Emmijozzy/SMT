interface User {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  role: "team_member" | "manager" | "admin";
  team: string;
  teamId: string;
  location: string;
  whatsappLink: string;
  facebookLink: string;
  linkedInLink: string;
  canCreateTasks: boolean;
  canEditTasks: boolean;
  canDeleteTasks: boolean;
  canViewReports: boolean;
  canAddSubtasks: boolean;
  canReassignTasks: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canAssignRole: boolean;
  password: string;
  confirmPassword: string;
}

export interface IUser {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicUrl: string;
  password: string;
  role: "team_member" | "manager" | "admin";
  phoneNo: number;
  phone_no: number;
  teamId: string;
  team: string;
  location: string;
  permissions: {
    can_create_tasks: boolean;
    can_edit_tasks: boolean;
    can_delete_tasks: boolean;
    can_view_reports: boolean;
    can_add_subtasks: boolean;
    can_reassign_tasks: boolean;
    can_delete_users: boolean;
    can_edit_users: boolean;
    can_assign_roles: boolean;
  };
  socialLinks: {
    whatsappLink: string;
    facebookLink: string;
    linkedInLink: string;
  };
  subtasks:
    | [
        {
          subtaskId: string;
          taskId: string;
          title: string;
          team: string;
          description?: string;
          status?: "not started" | "completed" | "closed";
          priority: "low" | "medium" | "high";
          createdBy: string;
          lastModifiedBy: string;
          assignee: string;
          comments: string[];
          collaborators: string[];
          dueDate: Date;
          createdAt: Date;
          updatedAt: Date;
        },
      ]
    | string;
  del_flg: boolean;
  status: "online" | "offline";
  createdAt: string;
  updatedAt: string;
  updated_by: string;
  fullName?: string; // Optional property for pre-computed fullName
}

export interface ReqError {
  error: {
    data: {
      message: string;
      status: string;
      stack: string;
    };
  };
}

export default User;
