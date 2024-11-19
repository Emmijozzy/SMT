import { ITask } from "../tasks/tasksInterface";
import { IUser } from "../users/userInterface";

export interface ITeam {
  teamId?: string; // Unique team identifier (automatically generated)
  name: string;
  description: string;
  members?: IUser[] | string[]; // Array of ObjectIds referencing User documents
  managerId?: string; // Array of ObjectIds referencing Project documents (optional)
  tasks?: ITask[] | string[]; // Array of ObjectIds referencing
  subTasks?: string[] | string[]; // Array of ObjectIds referencing SubTask documents (optional)
  createdAt?: Date;
  updatedAt?: Date;
}
