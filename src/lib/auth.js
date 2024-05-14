import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
})

// import NextAuth from "next-auth"
// import GitHubProvider from "next-auth/providers/github"
// import { signIn, signOut } from "next-auth/react"

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// }

// export { signIn, signOut }
// export default NextAuth(authOptions)

// import NextAuth from "next-auth"
// import GitHubProvider from "next-auth/providers/github"

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// }

// export default NextAuth(authOptions)
