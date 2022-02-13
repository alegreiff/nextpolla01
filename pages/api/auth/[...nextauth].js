import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  verifyPassword,
} from "../../../lib/auth";
import usuarioGoogleToMongo from "../../../lib/authGoogleMongo";
import { connectToDatabase } from "../../../lib/db";
console.log("D", process.env.GOOGLE_CLIENT_ID);
export default NextAuth({
  /* session: {
    jwt: true,
  }, */
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0", // opt-in to Twitter OAuth 2.0
      profileUrl:
        "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials);
        const client = await connectToDatabase();
        const userCollections = await client.db().collection("users");
        const user = await userCollections.findOne({
          email: credentials.email,
        });
        console.log("USER", user);
        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Could not log in");
        }
        client.close();
        console.log(user);
        return { email: user.email };
      },
    }),
  ],
  secret: "pollosenfuga",
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        //return profile.email_verified && profile.email.endsWith("@example.com");
        console.log("La vida de", profile);
        usuarioGoogleToMongo(profile.name, profile.email, "Google");
      }

      if (account.provider === "twitter") {
        //return profile.email_verified && profile.email.endsWith("@example.com");
        console.log("La vida de Tuirá ", profile);
        usuarioGoogleToMongo(profile.name, profile.email, "Twitter");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
});

/* 

AAAAAAAAAAAAAAAAAAAAAACNZAEAAAAAFuAw9xJ6v4%2B6s1EC5p%2BZ%2BROC%2FYY%3DfMxFqNuwmBOao5KwE0kQjeJ9e9Lr2yZk9INK8csjvvX8i4X6JS
*/
