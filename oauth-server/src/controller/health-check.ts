import type { Request, Response } from "express";

const healthCheck = (_req: Request, res: Response) => {
    res.status(200).json({ message: "OK" });
};

export default healthCheck;
