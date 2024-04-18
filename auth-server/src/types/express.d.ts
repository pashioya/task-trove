import type { Logger } from "@tryve-apps/monday-server-sdk";
import { MondayJWTPayload } from "@/app/types";

export {};

declare global {
  namespace Express {
    export interface Request {
      session: MondayJWTPayload;
      logger: Logger;
      body: {
        payload: any;
      };
    }
  }
}
