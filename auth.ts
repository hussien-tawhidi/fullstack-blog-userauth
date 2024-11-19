import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/lib/db";
import User from "./src/models/user";
import bcrypt from "bcrypt";
import logger from "@/lib/logger";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return user; // Successfully authorized
        } catch (err: any) {
          logger.error(`Error in credentials provider: ${err.message}`);
          throw new Error(err.message); // Propagate the error to the frontend
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ user, trigger, session, token }: any) {
      try {
        // Add user details to the token on sign-in
        if (user) {
          token.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
            avatar: user.avatar,
            isAdmin: user.isAdmin,
            isVerified: user.isVerified,
            role: user.role,
          };
        }
        // Update token if session is updated
        if (trigger === "updated" && session) {
          token.user = {
            ...token.user,
            email: session.user.email,
            name: session.user.name,
          };
        }

        return token;
      } catch (error: any) {
        logger.error(`JWT callback error: ${error.message || error}`);
        throw new Error("An error occurred while processing the token.");
      }
    },

    /**
     * Customize the session object.
     */
    async session({ session, token }: any) {
      try {
        if (token?.user) {
          session.user = token.user;
          session.userId = token.user._id; // Ensure _id is used for MongoDB
        }
        return session;
      } catch (error: any) {
        logger.error(`Session callback error: ${error.message || error}`);
        throw new Error("An error occurred while processing the session.");
      }
    },

    /**
     * Handle sign-in logic and error reporting.
     */
    async signIn({ user, account, profile, email, credentials }: any) {
      try {
        // Allow sign-in if the user exists and passes checks
        if (user) return true;
        // Log failed sign-in attempts
        logger.warn(`Sign-in failed for email: ${email}`);
        return false; // Reject sign-in
      } catch (error: any) {
        logger.error(`Sign-in callback error: ${error.message || error}`);
        throw new Error("An error occurred during sign-in.");
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
});
