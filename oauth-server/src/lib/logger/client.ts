import { Logtail } from '@logtail/node'
import { env } from '@/env'

const logger = new Logtail(env.LOGTAIL_SOURCE_TOKEN)

export default logger
