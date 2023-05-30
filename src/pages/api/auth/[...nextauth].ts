import { Exists, query as q } from 'faunadb'

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { fauna } from '../../../services/fauna';

const client = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!client || !clientSecret) {
  throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are required");
}

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: client,
      clientSecret: clientSecret,
    })
  ],
  callbacks: {
    async signIn(user) {
      const { email } = user.user;
      const userExists = await fauna.query(
        Exists(
          q.Match(q.Index('user_by_email'), { email })
        )
      )

      try {
        if(!userExists) {
          console.log("user does not exist")
          await fauna.query(
            q.Create(
              q.Collection("users"),
                { data: { email } }
            )
          )
        } else {
          console.log('user already exists')
        }
        return true
      } catch {
        return false
      }
    },
  }
})
