"use client"
import Button from "@/atoms/Button/Button"
import { signIn, useSession, signOut } from "next-auth/react"
// import { FaGithub } from "react-icons/fa"

export default function Page() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <h1>Welcome, {session.user?.name}</h1>
        <Button onClick={() => signOut()} label="Sign Out" />
      </div>
    )
  }

  return (
    <div>
      <h1>Log In</h1>
      <Button onClick={() => signIn("github")} label={`Log In with GitHub`} />
    </div>
  )
}
