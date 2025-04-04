import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

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

        if (response.status === 200) {
          return true; // Allow sign-in
        } else {
          console.log("User does not exist, redirecting to signup...");
          return false;
        }
      } catch (error) {
        console.error("Error during sign-in process:", error);
        return false;
      }
    },

    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : `${baseUrl}/Dashboard`; // Redirect to Dashboard
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role || "jobseeker"; // Default role
        token.expires = Math.floor(Date.now() / 1000) + 20; // 20 seconds expiration
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role; // Get role from token
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
