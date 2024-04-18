import type { Request, Response } from "express";

const healthCheck = (req: Request, res: Response) => {
  req.logger.info("Health check");

  res.status(200).json({ message: "OK" });
};

export default healthCheck;
