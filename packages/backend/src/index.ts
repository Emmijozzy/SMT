import "dotenv/config";
import { port } from "./config";
import App from "./app";
import Auth from "./features/auth/cotroller";

const app = new App([new Auth()], port);

app.init();
