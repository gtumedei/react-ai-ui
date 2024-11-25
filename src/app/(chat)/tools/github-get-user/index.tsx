import { tool } from "ai"
import { z } from "zod"

const GithubUserApiResultSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string(),
  type: z.string(),
  html_url: z.string().url(),
  blog: z.string().url().nullable(),
  bio: z.string().nullable(),
  location: z.string().nullable(),
  email: z.string().nullable(),
  public_repos: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type GithubUserApiResult = z.infer<typeof GithubUserApiResultSchema>

const githubGetUser = tool({
  description: "Get information about a GitHub user.",
  parameters: z.object({
    username: z.string().describe("The account for which to fetch info."),
  }),
  execute: async ({ username }) => {
    const res = await fetch(`https://api.github.com/users/${username}`)
    const rawData = await res.json()
    const parsedData = GithubUserApiResultSchema.parse(rawData)
    return parsedData
  },
})

export default githubGetUser
