import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import CredentialsProvder from "next-auth/providers/credentials"
import { connectToDb } from "@/lib/utils"
import { User } from "@/lib/models"
import bcrypt from "bcryptjs"

const login = async (credentials) => {
  try {
    connectToDb()
    const user = await User.findOne({ username: credentials.username })
    if (!user) {
      throw new Error("User not found")
    }
    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    )
    if (!isPasswordCorrect) {
      throw new Error("Password is incorrect")
    }
    return user
  } catch (err) {
    console.log(err)
    throw new Error("Login failed")
  }
}

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
    CredentialsProvder({
      async authorize(credentials) {
        try {
          const user = await login(credentials)
          return user
        } catch (err) {
          return null
        }
      },
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
