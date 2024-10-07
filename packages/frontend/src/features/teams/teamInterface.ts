export interface ITeam {
  teamId?: string; // Unique team identifier (automatically generated)
  name: string;
  description: string;
  members?: [
    {
      user: string;
      role: "team_member" | "manager" | "admin";
      joinedAt?: Date;
    },
  ]; // Array of ObjectIds referencing User documents
  managerId?: string; // Array of ObjectIds referencing Project documents (optional)
  tasks?: string[];
  subTasks?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
