import SessionWrapper from "@/molecules/SessionWrapper/SessionWrapper"
import type { Metadata } from "next"

// import Link from "next/link"

export const metadata: Metadata = {
  title: "CMS",
  description: "Mini CMS",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionWrapper>
      <main lang="en">
        <h2>Mini CMS</h2>
        {/* <hr />
      <nav>
        <ul>
          <li>
            <Link href={`/crud/create`}>Create</Link>
          </li>
          <li>
            <Link href={`/crud/read`}>All Users</Link>
          </li>
        </ul>
      </nav> */}
        <hr />
        {children}
      </main>
    </SessionWrapper>
  )
}
