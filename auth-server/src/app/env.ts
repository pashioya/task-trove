import { EnvironmentVariablesManager } from "@mondaycom/apps-sdk";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const envManager = new EnvironmentVariablesManager({
  updateProcessEnv: true,
});

export const currentEnv = envManager.get("NODE_ENV");

export const isProd =
  typeof currentEnv === "string" && currentEnv.toLowerCase() === "production";

const booleanString = z
  .string()
  .refine((value) => value === "true" || value === "false")
  .transform((value) => value === "true");

const numberString = z
  .string()
  .refine((value) => !isNaN(Number(value)))
  .transform((value) => Number(value));

export const env = createEnv({
  server: {
    PORT: numberString.default("8080"),
    LOGTAIL_SOURCE_TOKEN: z.string().min(1),
    SEND_LOGS_TO_BETTERSTACK: booleanString,
    SEND_LOGS_TO_CONSOLE: booleanString,
    SEND_LOGS_TO_MONDAY: booleanString,
    MONDAY_API_VERSION: z.literal("2024-01"),
    MONDAY_SIGNING_SECRET: z.string().min(1),
  },

  isServer: true,

  runtimeEnvStrict: {
    PORT: process.env.PORT,
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN,
    SEND_LOGS_TO_BETTERSTACK: process.env.SEND_LOGS_TO_BETTERSTACK,
    SEND_LOGS_TO_CONSOLE: process.env.SEND_LOGS_TO_CONSOLE,
    SEND_LOGS_TO_MONDAY: process.env.SEND_LOGS_TO_MONDAY,
    MONDAY_API_VERSION: process.env.MONDAY_API_VERSION,
    MONDAY_SIGNING_SECRET: process.env.MONDAY_SIGNING_SECRET,
  },
});
