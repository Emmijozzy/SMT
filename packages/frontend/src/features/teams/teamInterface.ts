import { ITask } from "../tasks/tasksInterface";
import { IUser } from "../users/userInterface";

export interface ITeam {
  teamId?: string; // Unique team identifier (automatically generated)
  name: string;
  description: string;
  members?: IUser[]; // Array of ObjectIds referencing User documents
  managerId?: string; // Array of ObjectIds referencing Project documents (optional)
  tasks?: ITask[];
  subTasks?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
