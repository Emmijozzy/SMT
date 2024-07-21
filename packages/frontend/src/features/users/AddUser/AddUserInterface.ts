interface AddUser {
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
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canAssignRole: boolean;
  password: string;
  confirmPassword: string;
}

export default AddUser;
