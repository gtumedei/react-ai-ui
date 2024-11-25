import type { Metadata } from "next"
import { Inter } from "next/font/google"
import cn from "~/lib/cn"

import "~/app/main.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s • react-ai-ui",
    default: "react-ai-ui",
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en" className="h-full flex text-gray-700">
      <body className={cn("grow flex flex-col", inter.className)}>
        <main className="container md:max-w-2xl grow flex flex-col px-6 mx-auto">{children}</main>
      </body>
    </html>
  )
}

export default RootLayout
