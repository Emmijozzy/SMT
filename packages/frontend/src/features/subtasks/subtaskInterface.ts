export interface ISubtask {
  subtaskId: string;
  taskId: string;
  title: string;
  team: string;
  description?: string;
  status?: "open" | "pending" | "complete";
  priority: "low" | "medium" | "high";
  createdBy: string;
  lastModifiedBy: string;
  assignee: string;
  comments: string[];
  collaborators: string[];
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
