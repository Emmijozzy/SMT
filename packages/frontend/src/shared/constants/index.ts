import Diversity1Icon from "@mui/icons-material/Diversity1";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
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
    path: "/admin/dash/subtasks",
    title: "Subtasks",
    icon: FormatListBulletedIcon,
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
    path: "/manager/dash/subtasks",
    title: "Subtasks",
    icon: FormatListBulletedIcon,
  },
];

export const memberRoutes = [
  {
    path: "/team_member/dash",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/team_member/dash/subtasks",
    title: "Subtasks",
    icon: FormatListBulletedIcon,
  },
];
