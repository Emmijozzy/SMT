export interface TaskPayload {
  taskId?: string;
  title: string;
  description?: string;
  responsibleTeam: string;
  assignedTo?: string[];
  priority: "low" | "medium" | "high";
  status?: "not started" | "in progress" | "completed" | "closed";
  startDate: string;
  createdBy: string;
  modifiedBy?: string;
  dueDate?: string;
  managerTask: boolean;
  managerId: string;
  subTasks?: string[];
  del_flg?: boolean;
}

export interface Task {
  taskId: string;
  title: string;
  description: string;
  assignedTo: string[];
  responsibleTeam: string;
  status: "not started" | "in progress" | "completed" | "closed";
  managerTask: boolean;
  createdBy: string;
  modifiedBy?: string;
  managerId: string;
  priority: "low" | "medium" | "high";
  dueDate: Date;
  startDate: Date;
  del_flg: boolean;
}
