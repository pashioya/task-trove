import { Logtail } from '@logtail/node'
import { EnvironmentVariablesManager } from '@mondaycom/apps-sdk'
import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const envManager = new EnvironmentVariablesManager({
  updateProcessEnv: true
})

export const currentEnv = envManager.get('NODE_ENV')

export const isProd = typeof currentEnv === 'string' && currentEnv.toLowerCase() === 'production'

const numberString = z
  .string()
  .refine((value) => !isNaN(Number(value)))
  .transform((value) => Number(value))

export const env = createEnv({
  server: {
    PORT: numberString.default('8080'),
    MONDAY_CLIENT_ID: z.string().min(1),
    MONDAY_CLIENT_SECRET: z.string().min(1),
    MONDAY_REDIRECT_URI: z.string().min(1),
    LOGTAIL_SOURCE_TOKEN: z.string().min(1)
  },

  isServer: true,

  runtimeEnvStrict: {
    PORT: process.env.PORT,
    MONDAY_CLIENT_ID: process.env.MONDAY_CLIENT_ID,
    MONDAY_CLIENT_SECRET: process.env.MONDAY_CLIENT_SECRET,
    MONDAY_REDIRECT_URI: process.env.MONDAY_REDIRECT_URI,
    LOGTAIL_SOURCE_TOKEN: process.env.LOGTAIL_SOURCE_TOKEN
  }
})
