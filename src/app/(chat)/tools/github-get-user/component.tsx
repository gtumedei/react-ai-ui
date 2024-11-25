import { FC } from "react"
import TablerBrandGithub from "~icons/tabler/brand-github"
import TablerCodeDots from "~icons/tabler/code-dots"
import TablerMapPin from "~icons/tabler/map-pin"
import TablerWorld from "~icons/tabler/world"
import { GithubUserApiResult } from "./"

const GithubUserCard: FC<{ user: GithubUserApiResult }> = ({ user }) => {
  return (
    <div className="min-w-96 bg-gray-100 py-3 pl-3 pr-6 rounded-lg border border-gray-300">
      <div className="flex gap-4">
        <div className="h-11 w-11 flex justify-center items-center rounded-full bg-blue-300 text-blue-800">
          {user.login[0].toUpperCase()}
        </div>
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.login}</p>
          {user.bio && <p className="text-sm mt-2">{user.bio}</p>}
        </div>
      </div>
      <ul className="flex flex-col gap-2 pt-3">
        <li className="flex gap-2 items-center">
          <TablerCodeDots className="text-gray-500" />
          <span className="text-sm">{user.public_repos} repositories</span>
        </li>
        {user.location && (
          <li className="flex gap-2 items-center">
            <TablerMapPin className="text-gray-500" />
            <span className="text-sm">{user.location}</span>
          </li>
        )}
        <li className="flex gap-2 items-center">
          <TablerBrandGithub className="text-gray-500" />
          <a
            href={user.html_url}
            target="_blank"
            className="text-sm hover:text-blue-500 transition-colors"
          >
            GitHub page
          </a>
        </li>
        {user.blog && (
          <li className="flex gap-2 items-center">
            <TablerWorld className="text-gray-500" />
            <a
              href={user.blog}
              target="_blank"
              className="text-sm hover:text-blue-500 transition-colors"
            >
              Personal website
            </a>
          </li>
        )}
      </ul>
    </div>
  )
}

export default GithubUserCard
