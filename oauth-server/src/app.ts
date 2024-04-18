import cors from "cors";
import express, { Request, Response } from "express";
import AuthTokenController from "./controller/auth-token";
import healthCheck from "./controller/health-check";

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
export default app;
