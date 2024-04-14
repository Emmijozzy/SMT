import "dotenv/config";
import { port } from "./config";
import App from "./app";
import Auth from "./features/auth/cotroller";
import TaskController from "./features/task/controller/taskController";
import TeamController from "./features/team/controller";

const app = new App([new Auth(), new TaskController(), new TeamController()], port);

app.init();
