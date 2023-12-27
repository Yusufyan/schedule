import bodyParser from "body-parser";
import express, { Application } from "express";
import { env } from "./configs/env.config";
import cors from "cors";
import { Request, Response } from "express";
import { ResponseHandler } from "./middlewares/response.middleware";

const app: Application = express();
const port: number = Number(env.APP_PORT);

app.use(bodyParser.json());
app.use(cors());
app.use(ResponseHandler);
//Check health
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Healthy buddy" });
});
