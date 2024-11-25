import { tool } from "ai"
import { z } from "zod"

const GithubListReposApiResultSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    full_name: z.string(),
    description: z.string().nullable(),
    owner: z.object({
      id: z.number(),
      login: z.string(),
    }),
    language: z.string().nullable(),
    stargazers_count: z.number(),
    open_issues_count: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
  })
)

export type GithubListReposApiResult = z.infer<typeof GithubListReposApiResultSchema>

const githubListRepos = tool({
  description: "Get the list of repositories of a given GitHub user.",
  parameters: z.object({
    username: z.string().describe("The account for which to fetch the list of repositories."),
  }),
  execute: async ({ username }) => {
    const res = await fetch(`https://api.github.com/users/${username}/repos`)
    const rawData = await res.json()
    const parsedData = GithubListReposApiResultSchema.parse(rawData)
    return parsedData
  },
})

export default githubListRepos
