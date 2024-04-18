import { Logger as MondayLogger } from "@mondaycom/apps-sdk";
import { Logger } from "@tryve-apps/monday-server-sdk";
import { env } from "../app/env";

export const logger = new Logger({
  betterstack: {
    enabled: env.SEND_LOGS_TO_BETTERSTACK,
    sourceToken: env.LOGTAIL_SOURCE_TOKEN,
  },
  console: {
    enabled: env.SEND_LOGS_TO_CONSOLE,
  },
  monday: {
    enabled: env.SEND_LOGS_TO_MONDAY,
    logger: new MondayLogger("template-server"),
  },
});
