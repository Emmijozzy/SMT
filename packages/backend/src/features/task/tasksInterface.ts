export interface TaskPayload {
  taskId?: string;
  title: string;
  description?: string;
  responsibleTeam: string;
  assignedTo?: string[];
  priority: "low" | "medium" | "high";
  status?: "not started" | "in progress" | "completed" | "closed";
  dueDate?: string;
  managerTask: boolean;
  managerId: string;
  subTasks?: string[];
  del_flg?: boolean;
}
