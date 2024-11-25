import { FC } from "react"
import { GithubListReposApiResult } from "~/app/(chat)/tools/github-list-repos"

const GithubRepoListCard: FC<{ repositories: GithubListReposApiResult }> = ({ repositories }) => {
  return (
    <div className="prose prose-sm">
      <pre>{JSON.stringify(repositories, null, 2)}</pre>
    </div>
  )
}

export default GithubRepoListCard
