import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { connectToDb } from "@/lib/utils"
import { User } from "@/lib/models"

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
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(profile)
      if (account.provider === "github") {
        connectToDb()
        try {
          const user = await User.findOne({ email: profile.email })
          // if the user does not exist, create a new user
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              image: profile.avtar_url,
            })
            await newUser.save()
          }
        } catch (err) {
          console.log(err)
          return false
        }
      }
      return true
    },
  },
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
// import { async, connectToDb } from "./utils"
// import { User } from "./models"

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// }

// export default NextAuth(authOptions)
