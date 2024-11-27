import { findUser } from "@/actions/db/user/read"
import { IUser } from "@/models/User"
import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) {
        const foundUser: IUser = await findUser(user.email)
        // const foundUser: IUser = await findUser("test@domain.example")
        return foundUser.email === user.email || false
      } else {
        return false
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
