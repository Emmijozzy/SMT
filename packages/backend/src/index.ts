import "dotenv/config";
import { port } from "./config";
import App from "./app";
import Auth from "./features/auth/cotroller";
import TaskController from "./features/task/controller/taskController";
import TeamController from "./features/team/teamController";
import UserController from "./features/users/userController";

const app = new App([new Auth(), new TaskController(), new TeamController(), new UserController()], port);

app.init();
