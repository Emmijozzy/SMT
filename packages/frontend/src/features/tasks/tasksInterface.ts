export interface ITask {
  taskId?: string;
  title: string;
  description: string;
  assignedTo?: string[];
  responsibleTeam: {
    name: string;
    teamId: string;
  };
  status: "not started" | "in progress" | "completed" | "closed";
  managerTask: boolean;
  managerId: string;
  priority: "low" | "medium" | "high";
  startDate: string;
  dueDate: string;
  del_flg?: boolean;
}
