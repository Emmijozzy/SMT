import { ComponentType, ReactNode } from "react";

export type TabType = "tasks" | "projects" | "messages" | "analytics";

export interface TabConfig {
  id: TabType;
  label: string;
  icon: ComponentType<any>;
  badge?: number;
}

export interface TabContentProps {
  isActive: boolean;
  data?: any;
  onAction?: (action: string, id: any) => void;
}

export interface TabRenderer {
  render(props: TabContentProps): ReactNode;
}
