import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

const env = createEnv({
  server: {
    OPENAI_API_KEY: z.string(),
  },
  client: {},
  runtimeEnv: {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
})

export default env
