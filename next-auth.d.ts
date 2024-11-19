import { Session } from "next-auth";
import { DefaultSession } from "next-auth/core";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      _id: string; // Add _id here
    } & DefaultSession["user"];
  }
}
