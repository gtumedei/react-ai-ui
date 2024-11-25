import { tool } from "ai"
import { z } from "zod"

const GithubRepoApiResultSchema = z.object({
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

export type GithubRepoApiResult = z.infer<typeof GithubRepoApiResultSchema>

const GithubReleasesApiResultSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    tagName: z.string().nullish(),
    url: z.string().url(),
    body: z.string(),
    author: z.object({
      id: z.number(),
      login: z.string(),
    }),
    draft: z.boolean(),
    prerelease: z.boolean(),
    reactions: z
      .object({
        total_count: z.number(),
        "+1": z.number(),
        "-1": z.number(),
        laugh: z.number(),
        hooray: z.number(),
        confused: z.number(),
        heart: z.number(),
        rocket: z.number(),
        eyes: z.number(),
      })
      .nullish(),
    created_at: z.string(),
    updated_at: z.string().nullish(),
  })
)

const githubGetRepo = tool({
  description: "Get information about a public GitHub repository.",
  parameters: z.object({
    owner: z.string().describe("The account owning the repository."),
    name: z.string().describe("The name of the repository to get info about."),
  }),
  execute: async ({ owner, name }) => {
    const [rawRepoData, rawReleasesData] = await Promise.all([
      fetch(`https://api.github.com/repos/${owner}/${name}`).then((res) => res.json()),
      fetch(`https://api.github.com/repos/${owner}/${name}/releases`).then((res) => res.json()),
    ])
    const repoData = GithubRepoApiResultSchema.parse(rawRepoData)
    const releasesData = GithubReleasesApiResultSchema.parse(rawReleasesData)
    const res = {
      ...repoData,
      releases: releasesData,
    }
    return res
  },
})

export default githubGetRepo
