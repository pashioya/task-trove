import { z } from 'zod';

const ExtensionsSchema = z
  .object({
    code: z.string().optional(),
  })
  .catchall(z.unknown());

const ErrorLocationSchema = z.object({
  line: z.number(),
  column: z.number(),
});

export const ErrorSchema = z.object({
  message: z.string(),
  locations: z.array(ErrorLocationSchema).optional(),
  path: z.array(z.string()).optional(),
  extensions: ExtensionsSchema.optional(),
});

const ErrorsSchema = z.object({
  errors: z.array(ErrorSchema),
  account_id: z.number().optional(),
});

const ErrorCodeSchema = z.object({
  errorCode: z.string(),
  statusCode: z.number(),
  errorMessage: z.string(),
  errorData: z.record(z.unknown()),
  account_id: z.number().optional(),
});

const ErrorMessageSchema = z.object({
  error_message: z.string(),
  status_code: z.number(),
  account_id: z.number().optional(),
});

/**
 * Monday API Errors:
 * {
 *   errorCode: "NOT_FOUND",
 *   statusCode: 404,
 *   errorMessage: "The requested resource was not found",
 *   errorData: {
 *     resource: "Item",
 *     id: "123"
 *   },
 *   account_id: "123456789"
 * }
 * OR
 * {
 *   error_message: "Invalid request",
 *   status_code: 400,
 *   account_id: "123456789"
 * }
 * OR
 * {
 *   errors: [
 *     {
 *       message: "Cannot query field \"name\" on type \"Item\".",
 *       locations: [
 *         { line: 2, column: 3 }
 *       ],
 *       path: ["query", "field"],
 *       extensions: {
 *         code: "GRAPHQL_VALIDATION_FAILED",
 *         additional_info: "Some extra information"
 *       }
 *     }
 *   ],
 *   account_id: "123456789"
 * }
 */
export const MondayErrorSchema = z.union([ErrorCodeSchema, ErrorMessageSchema, ErrorsSchema]);
