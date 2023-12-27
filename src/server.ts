import bodyParser from "body-parser";
import express, { Application } from "express";
import { env } from "./configs/environment.config";
import cors from "cors";
import { Request, Response } from "express";
import { ResponseHandler } from "./middlewares/response.middleware";
import { createConnection } from "typeorm";
import { configDb } from "./configs/database.config";
import { logging } from "./utils/logging.util";

const app: Application = express();
const port: number = Number(env.APP_PORT);

app.use(bodyParser.json());
app.use(cors());
app.use(ResponseHandler);
//Check health
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "Healthy buddy" });
});

createConnection(configDb)
  .then(async () => {
    logging.info(`Database connection established`);
    app.listen(port, () => {
      logging.info(`Server running on http://${env.APP_HOST}:${port}`);
    });
    // await RolePermission();
  })
  .catch((e) => {
    logging.error(`Unable to connect to database ${e}`);
    process.exit;
  });