import cors from "cors";
import express from "express";

const app = express();
const port = 3001;
export interface QueryPayload {
  foo: string;
}

app.use(cors());

app.get("/data", (req, res) => {
  console.log(req);
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data: QueryPayload = { foo: "Joseph" };
  res.json(data);
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
