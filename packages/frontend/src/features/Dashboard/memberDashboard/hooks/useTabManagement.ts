import { useMemo, useState } from "react";
import { FiBarChart2, FiCalendar, FiList, FiMessageSquare } from "react-icons/fi";
import { AnalyticsTab } from "../components/tabs/AnalyticsTab";
import { MessagesTab } from "../components/tabs/MessagesTab";
import { ProjectsTab } from "../components/tabs/ProjectsTab";
import { TasksTab } from "../components/tabs/TasksTab";
import { TabConfig, TabType } from "../types/TabTypes";

interface UseTabManagementProps {
  tasksCount: number;
  projectsCount: number;
  unreadMessagesCount: number;
}

export function useTabManagement({ tasksCount, projectsCount, unreadMessagesCount }: UseTabManagementProps) {
  const [activeTab, setActiveTab] = useState<TabType>("tasks");

  const tabConfigs: TabConfig[] = useMemo(
    () => [
      {
        id: "tasks",
        label: "My Tasks",
        icon: FiList,
        badge: tasksCount,
      },
      {
        id: "projects",
        label: "Projects",
        icon: FiCalendar,
        badge: projectsCount,
      },
      {
        id: "messages",
        label: "Messages",
        icon: FiMessageSquare,
        badge: unreadMessagesCount,
      },
      {
        id: "analytics",
        label: "Analytics",
        icon: FiBarChart2,
      },
    ],
    [tasksCount, projectsCount, unreadMessagesCount],
  );

  const tabRenderers = useMemo(
    () => ({
      tasks: new TasksTab(),
      projects: new ProjectsTab(),
      messages: new MessagesTab(),
      analytics: new AnalyticsTab(),
    }),
    [],
  );

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  return {
    activeTab,
    tabConfigs,
    tabRenderers,
    handleTabChange,
  };
}
