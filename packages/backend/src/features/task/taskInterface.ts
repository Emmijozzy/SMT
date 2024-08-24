export interface TaskPayload {
  title: string;
  description: string;
  responsibleTeam: string;
  priority: string;
  dueDate: Date;
  managerTask: boolean;
  managerId: string;
}

export interface Task {
  taskId: string;
  title: string;
  description: string;
  assignedTo: string[];
  responsibleTeam: string;
  status: "not started" | "in progress" | "completed" | "closed";
  managerTask: boolean;
  managerId: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  del_flg: boolean;
}
