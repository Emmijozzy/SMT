import "dotenv/config";
import App from "./app";
import { port } from "./config";
import TasksAdminController from "./features/Admin/Task/tasksAdminController";
import Auth from "./features/auth/authCotroller";
import TaskController from "./features/task/controller/taskController";
import createTeamController from "./features/team/createTeamController";
import UserAdminController from "./features/users/userAdminController";
import UserController from "./features/users/userController";

const app = new App(
  [
    new Auth(),
    new TaskController(),
    new UserController(),
    new UserAdminController(),
    new TasksAdminController(),
    createTeamController()
  ],
  port
);

app.init();
