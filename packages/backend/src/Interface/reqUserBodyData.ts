interface ReqUserBodyData {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNo: string;
  role: "team_member" | "manager" | "admin";
  team: string;
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
  canDeleteUsers: boolean;
  canEditUsers: boolean;
  canAssignRole: boolean;
  password: string;
  confirmPassword: string;
}

export default ReqUserBodyData;
