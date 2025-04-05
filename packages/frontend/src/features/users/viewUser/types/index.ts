import { ISubtask } from "../../../subtasks/subtaskInterface";
import { IUser } from "../../userInterface";

export interface SocialLinksProps {
  whatsappLink: string;
  facebookLink: string;
  linkedInLink: string;
}

export interface UserHeaderProps {
  user: IUser;
  userRole: string;
}

export interface UserTasksTableProps {
  data: (ISubtask & Record<string, unknown>)[];
  isLoading: boolean;
}
