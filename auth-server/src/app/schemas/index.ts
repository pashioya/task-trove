import { z } from "zod";

import {
  createMondayJWTPayloadSchema,
  createMondaySubscriptionSchema,
} from "@tryve-apps/monday-server-sdk";
import { PlanId } from "../types/enums";

export const MondaySubscriptionSchema = createMondaySubscriptionSchema(PlanId);
export const MondayJWTPayloadSchema = createMondayJWTPayloadSchema(
  MondaySubscriptionSchema
);

export const HelloMondayInputFieldsSchema = z.object({
  boardId: z.number(),
  itemId: z.number(),
  titleColumnId: z.string(),
  textColumnId: z.string(),
});

export const HelloMondayRequestPayloadSchema = z.object({
  blockKind: z.literal("action"),
  inboundFieldValues: HelloMondayInputFieldsSchema,
  inputFields: HelloMondayInputFieldsSchema,
  recipeId: z.number(),
  integrationId: z.number(),
});
