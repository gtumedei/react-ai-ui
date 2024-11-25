import { FC } from "react"
import { GithubRepoApiResult } from "~/app/(chat)/tools/github-get-repo"

const GithubRepoCard: FC<{ repository: GithubRepoApiResult }> = ({ repository }) => {
  return (
    <div className="prose prose-sm">
      <pre>{JSON.stringify(repository, null, 2)}</pre>
    </div>
  )
}

export default GithubRepoCard
