import { ComponentType } from "react";
import { TableBodyProps, TableHeaderProps } from "../../../../shared/components/masterTable/MasterTable";
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
  columns: TableHeaderProps;
  TableBody: ComponentType<TableBodyProps<ISubtask & Record<string, unknown>>>;
}
