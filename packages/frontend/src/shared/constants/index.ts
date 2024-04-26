import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export const adminroutes = [
  {
    path: "/dash",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/dash/users",
    title: "Users",
    icon: PeopleIcon,
  },
  {
    path: "/dash/tasks",
    title: "Tasks",
    icon: TaskIcon,
  },
  {
    path: "/dash/teams",
    title: "Teams",
    icon: Diversity1Icon,
  },
];
