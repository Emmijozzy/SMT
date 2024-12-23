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
  responsibleTeam:
    | {
        name: string;
        teamId: string;
      }
    | string;
  status: "not started" | "in progress" | "completed" | "closed";
  subtasks:
    | [
        {
          subtaskId: string;
          title: string;
          status: "not started" | "in progress" | "completed" | "closed";
        },
      ]
    | string;
  managerTask: boolean;
  managerId: string;
  priority: "low" | "medium" | "high";
  startDate: string;
  dueDate: string;
  del_flg?: boolean;
}
