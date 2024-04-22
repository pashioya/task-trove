import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";

import healthCheck from "./controller/health-check";
import helmet from "helmet";
import AuthTokenController from "./controller/auth-token";
import { env } from "./env";
const app = express();

app.use(
    /** Express middleware */
    cors({
        origin: "*",
    })
);
// Middlewares
app.use(helmet()); // security-related HTTP headers

app.get("/", (_req: Request, res: Response) =>
    res.send("OAuth Server is running!")
);
app.get("/auth-token", AuthTokenController);
app.get("/health-check", healthCheck);

app.disable("x-powered-by");

app.listen(env.PORT, () =>
    console.log("Starting ExpressJS server on Port " + env.PORT)
);

export default app;
