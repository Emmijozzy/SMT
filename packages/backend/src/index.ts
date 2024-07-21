import "dotenv/config";
import { port } from "./config";
import App from "./app";
import Auth from "./features/auth/authCotroller";
import TaskController from "./features/task/controller/taskController";
import TeamController from "./features/team/teamController";
import UserController from "./features/users/userController";
import UserAdminController from "./features/Admin/User/userAdminController";

const app = new App(
  [new Auth(), new TaskController(), new TeamController(), new UserController(), new UserAdminController()],
  port
);

app.init();
