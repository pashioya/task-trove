import { z } from 'zod';

const ExtensionsSchema = z.object({
  code: z.string(),
  name: z.string().optional(),
  typeName: z.string().optional(),
  argumentName: z.string().optional(),
  fieldName: z.string().optional(),
  variableName: z.string().optional(),
});

const ErrorLocationSchema = z.object({
  line: z.number(),
  column: z.number(),
});

const ErrorSchema = z.object({
  message: z.string(),
  locations: z.array(ErrorLocationSchema),
  extensions: ExtensionsSchema,
  path: z.array(z.string()),
});

export const ErrorsTypeSchema = z.object({
  errors: z.array(ErrorSchema),
  account_id: z.number(),
});

export const ErrorCodeTypeSchema = z.object({
  error_code: z.string(),
  status_code: z.number(),
  error_message: z.string(),
  error_data: z.record(z.any()),
});

export const ErrorMessageTypeSchema = z.object({
  error_message: z.string(),
  status_code: z.number(),
});
