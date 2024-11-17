import Diversity1Icon from "@mui/icons-material/Diversity1";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";

export const adminRoutes = [
  {
    path: "/admin/dash",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/admin/dash/users",
    title: "Users",
    icon: PeopleIcon,
  },
  {
    path: "/admin/dash/tasks",
    title: "Tasks",
    icon: TaskIcon,
  },
  {
    path: "/admin/dash/teams",
    title: "Teams",
    icon: Diversity1Icon,
  },
];

export const managerRoutes = [
  {
    path: "/manager/dash",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/manager/dash/users",
    title: "Users",
    icon: PeopleIcon,
  },
  {
    path: "/manager/dash/tasks",
    title: "Tasks",
    icon: TaskIcon,
  },
  {
    path: "/manager/dash/sub-tasks",
    title: "Sub Tasks",
    icon: TaskIcon,
  },
];

export const memberRoutes = [
  {
    path: "/team_member/dash",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/team_member/dash/tasks",
    title: "Tasks",
    icon: TaskIcon,
  },
  {
    path: "/team_member/dash/sub-tasks",
    title: "Sub Tasks",
    icon: TaskIcon,
  },
];
