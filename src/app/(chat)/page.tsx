"use client"

import { Message, useChat } from "ai/react"
import { FC } from "react"
import Markdown from "react-markdown"
import GithubRepoCard from "~/app/(chat)/tools/github-get-repo/component"
import GithubUserCard from "~/app/(chat)/tools/github-get-user/component"
import GithubRepoListCard from "~/app/(chat)/tools/github-list-repos/component"
import TablerRobotFace from "~icons/tabler/robot-face"
import TablerUser from "~icons/tabler/user"

const ChatPage = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <>
      <div className="bg-white py-4 border-b sticky top-0">
        <h1 className="max-6-xs text-center text-blue-500 uppercase">React AI UI</h1>
      </div>

      <div className="grow w-full flex flex-col pb-20">
        <div className="flex flex-col gap-6 py-6">
          {messages.map((message, i) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLoading={i == messages.length - 1 && isLoading}
            />
          ))}
        </div>
      </div>

      <div className="flex fixed bottom-0 inset-x-0">
        <form
          className="container md:max-w-2xl flex gap-2 px-6 py-4 mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="grow block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            value={input}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300"
          >
            Send
          </button>
        </form>
      </div>
    </>
  )
}

const ChatMessage: FC<{ message: Message; isLoading: boolean }> = ({ message, isLoading }) => {
  return (
    <div className="flex gap-4">
      <div
        className={`shrink-0 h-9 w-9 flex justify-center items-center rounded-lg border text-center text-sm font-medium mt-[7px] shadow-sm ${
          message.role == "user"
            ? "border-gray-300 bg-white text-gray-700 "
            : "border-gray-700 bg-gray-700 text-white shadow-sm"
        }`}
      >
        {message.role == "user" ? (
          <TablerUser />
        ) : isLoading ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
              opacity=".25"
            />
            <path
              fill="currentColor"
              d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            >
              <animateTransform
                attributeName="transform"
                dur="0.75s"
                repeatCount="indefinite"
                type="rotate"
                values="0 12 12;360 12 12"
              />
            </path>
          </svg>
        ) : (
          <TablerRobotFace />
        )}
      </div>
      {message.toolInvocations ? (
        <UIMessageContent message={message} />
      ) : (
        <TextMessageContent message={message} />
      )}
    </div>
  )
}

const TextMessageContent: FC<{ message: Message }> = ({ message }) => {
  return (
    <div
      className={`prose prose-sm px-4 py-3 rounded-lg ${
        message.role == "user" ? "border border-gray-200" : "bg-gray-100 border border-gray-300"
      }`}
    >
      <Markdown>{message.content}</Markdown>
    </div>
  )
}

const UIMessageContent: FC<{ message: Message }> = ({ message }) => {
  return (
    <>
      {message.toolInvocations?.map((toolInvocation) => {
        const { toolName, toolCallId, state } = toolInvocation
        if (state == "result") {
          const { result } = toolInvocation
          if (toolName == "githubGetUser") return <GithubUserCard key={toolCallId} user={result} />
          if (toolName == "githubListRepos")
            return <GithubRepoListCard key={toolCallId} repositories={result} />
          if (toolName == "githubGetRepo")
            return <GithubRepoCard key={toolCallId} repository={result} />
          return "unknown tool"
        } else {
          return (
            <TextMessageContent key={toolCallId} message={{ ...message, content: "Loading..." }} />
          )
        }
      })}
    </>
  )
}

export default ChatPage
