export interface ICreateTeam {
  name: string;
  description: string;
  managerId: string;
}

export interface IUpdateTeam {
  name: string;
  description: string;
  managerId: string;
  tasks: string[];
  subTasks: string[];
  members: string[];
  updatedAt?: Date;
}
