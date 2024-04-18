import { cors } from "cors";
import express, { Request, Response } from "express";
import AuthTokenController from "./controller/auth-token";

const app = express();

app.use([
    /** Express middleware */
    cors({
        origin: "*",
    }),
]);

app.get("/", (req: Request, res: Response) =>
    res.send("Hello World from app.ts!")
);

app.get("/auth-token", AuthTokenController);

export default app;
