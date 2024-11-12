import "dotenv/config";
import App from "./app";
import { port } from "./config";
import AuthController from "./features/auth/authController";
import TaskController from "./features/task/controllers/taskController";
import TasksAdminController from "./features/task/controllers/tasksAdminController";
import TeamController from "./features/team/teamController";
import UserAdminController from "./features/users/controllers/userAdminController";
import UserController from "./features/users/controllers/userController";

const app = new App(
  [
    new AuthController(),
    new TaskController(),
    new UserController(),
    new UserAdminController(),
    new TasksAdminController(),
    new TeamController()
  ],
  port
);

app.init();
