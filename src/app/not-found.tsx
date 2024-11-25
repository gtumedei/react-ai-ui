import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page not found",
}

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center text-center py-16">
      <h1 className="max-6-xs text-6xl text-blue-700 font-thin uppercase mb-16">Not Found</h1>
      <p>
        Visit{" "}
        <a href="https://nextjs.org/" target="_blank" className="text-blue-600 hover:underline">
          nextjs.org
        </a>{" "}
        to learn how to build Next.js apps.
      </p>
    </div>
  )
}

export default NotFoundPage
