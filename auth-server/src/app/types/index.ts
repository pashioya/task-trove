import { z } from "zod";
import { MondaySubscriptionSchema, MondayJWTPayloadSchema } from "../schemas";

export type MondaySubscription = z.infer<typeof MondaySubscriptionSchema>;
export type MondayJWTPayload = z.infer<typeof MondayJWTPayloadSchema>;
