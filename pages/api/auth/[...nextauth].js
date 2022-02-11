import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  verifyPassword,
} from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
console.log("D", process.env.GOOGLE_CLIENT_ID);
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
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
});
