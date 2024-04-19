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

app.get("/", (_req: Request, res: Response) =>
    res.send("Hello World from app.ts!")
);
app.get("/auth-token", (req: Request, res: Response) =>
    AuthTokenController(req, res)
);
app.get("/health-check", (req: Request, res: Response) =>
    healthCheck(req, res)
);

app.use(helmet()); // security-related HTTP headers

app.disable("x-powered-by");

app.listen(env.PORT, () =>
    console.log("Starting ExpressJS server on Port " + env.PORT)
);

export default app;
