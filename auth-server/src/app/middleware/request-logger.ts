import type { NextFunction, Response } from "express";
import type { MondayRequest } from "@tryve-apps/monday-server-sdk";
import { logger } from "@/lib/logger";
import { v4 as uuidv4 } from "uuid";
import { isProd } from "@/app/env";

const requestLogger = (req: MondayRequest, _: Response, next: NextFunction) => {
  const environment = isProd ? "PRODUCTION" : "LOCAL";

  const reqLogger = logger.child({
    uid: uuidv4(),
    environment,
  });

  reqLogger.info(
    `Incoming ${req.method} request for '${req.path}' in ${environment} environment`,
    {
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
      headers: { ...req.headers, authorization: "REDACTED" },
    }
  );

  req.logger = reqLogger;

  next();
};

export default requestLogger;
