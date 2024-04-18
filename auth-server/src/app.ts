import "dotenv/config";
import cors from "cors";
import express from "express";
import { env } from "@/app/env";
import routes from "@/app/routes";
import { requestLogger, authorization } from "@/app/middleware";

const app = express();

app.use([
  /** Express middleware */
  express.urlencoded({
    extended: true,
  }),
  express.json(),
  cors({
    origin: "*",
  }),

  /** Custom middleware */
  requestLogger,
  authorization,
]);

routes(app);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
