import { openai } from "@ai-sdk/openai"
import { convertToCoreMessages, streamText } from "ai"
import githubGetRepo from "~/app/(chat)/tools/github-get-repo"
import githubGetUser from "~/app/(chat)/tools/github-get-user"
import githubListRepos from "~/app/(chat)/tools/github-list-repos"

const model = openai("gpt-4o-mini")
const systemPrompt = `
You are a friendly CLI interface with some tools up your sleeve.
`

export const POST = async (req: Request) => {
  const { messages } = await req.json()

  const result = await streamText({
    model,
    system: systemPrompt,
    messages: convertToCoreMessages(messages),
    tools: { githubGetUser, githubListRepos, githubGetRepo },
    // maxSteps: 5,
  })

  return result.toDataStreamResponse()
}
