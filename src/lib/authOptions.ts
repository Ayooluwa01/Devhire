import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import axios from "axios";
import Cookies from "js-cookie";

// Extend NextAuth types directly
declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }

  interface JWT {
    role?: string;
    id: string;
    name: string;
    email: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,

  callbacks: {
    async signIn({ user }) {
      try {
        const response = await axios.post(
          `${process.env.BACKEND_URL}/auth`,
          {
            email: user.email,
            name: user.name,
          },
          { withCredentials: true }
        );

        return response.status === 200;
      } catch (error) {
        console.error("Error during sign-in process:", error);
        return false;
      }
    },

    async redirect() {
      return "/Dashboard";
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // Ensure role is assigned a string value
        token.role = (user.role ?? "jobseeker") as string; // Default to "jobseeker"
        token.expires = Math.floor(Date.now() / 1000) + 20;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as any;
        session.user.name = token.name as any;
        session.user.email = token.email as any;
        // Ensure role is a string
        session.user.role = token.role as string; // Default to "jobseeker"
      }
      return session;
    },
  },
};
