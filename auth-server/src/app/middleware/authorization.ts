import type { Response, NextFunction } from "express";
import {
  MondayRequest,
  ErrorMessages,
  StatusCodes,
} from "@tryve-apps/monday-server-sdk";
import { env } from "@/app/env";
import { Route } from "@/app/routes";
import { MondayJWTPayloadSchema } from "@/app/schemas";
import jwt from "jsonwebtoken";

const authorization = (
  req: MondayRequest,
  res: Response,
  next: NextFunction
) => {
  let {
    logger,
    headers: { authorization },
  } = req;

  if (req.path === Route.HEALTH_CHECK || req.path.includes(Route.FAV_ICON)) {
    return next();
  }

  if (!authorization && req.query && req.query.token) {
    authorization = `Bearer ${req.query.token}`;
  }

  if (!authorization) {
    logger.error(ErrorMessages.MISSING_AUTHORIZATION_HEADER);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: ErrorMessages.MISSING_AUTHORIZATION_HEADER,
    });
  }

  const { MONDAY_SIGNING_SECRET } = env;

  try {
    const jwtPayload = jwt.verify(authorization, MONDAY_SIGNING_SECRET);

    const parsedPayload = MondayJWTPayloadSchema.safeParse(jwtPayload);

    if (!parsedPayload.success) {
      logger.error(parsedPayload.error.message);
      return res.status(StatusCodes.UNAUTHORIZED).json({
        error: parsedPayload.error.message,
      });
    }

    req.session = parsedPayload.data;
    req.logger = logger.child({ accountId: parsedPayload.data.accountId });

    logger.info(
      `User authenticated. Account ID: ${parsedPayload.data.accountId}`,
      {
        accountId: parsedPayload.data.accountId,
      }
    );

    next();
  } catch (error) {
    logger.error(ErrorMessages.INVALID_TOKEN, { error });
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ErrorMessages.NOT_AUTHENTICATED,
    });
  }
};

export default authorization;
