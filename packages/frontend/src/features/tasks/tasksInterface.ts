export interface ITask {
  taskId?: string;
  title: string;
  description: string;
  assignedTo?:
    | string[]
    | [
        {
          userId: string;
          email: string;
          fullName: string;
          phone_no: string;
          team: string;
          profilePicUrl: string;
        },
      ];
  responsibleTeam: string | { teamId: string; name: string };
  status: "not started" | "in progress" | "completed" | "closed";
  subtasks?:
    | [
        {
          subtaskId: string;
          title: string;
          status: "not started" | "in progress" | "completed" | "closed";
        },
      ]
    | string;
  managerTask: boolean;
  progress: number;
  createdBy: string;
  modifiedBy?: string;
  managerId: string;
  priority: "low" | "medium" | "high";
  startDate: string;
  dueDate: string;
  del_flg?: boolean;
}
