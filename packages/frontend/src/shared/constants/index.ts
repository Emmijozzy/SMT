import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import TaskIcon from "@mui/icons-material/Task";
import Diversity1Icon from "@mui/icons-material/Diversity1";

export const adminroutes = [
  {
    path: "/",
    title: "Dashboard",
    icon: HomeIcon,
  },
  {
    path: "/users",
    title: "Users",
    icon: PeopleIcon,
  },
  {
    path: "/tasks",
    title: "Task",
    icon: TaskIcon,
  },
  {
    path: "/team",
    title: "Team",
    icon: Diversity1Icon,
  },
];
