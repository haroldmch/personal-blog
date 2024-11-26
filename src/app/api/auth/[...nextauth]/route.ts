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
      console.log({ user })
      return true
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
