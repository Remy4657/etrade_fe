import NextAuth from "next-auth";
import { cookies } from "next/headers"
import GoogleProvider from "next-auth/providers/google";
import axiosClient from "@/utils/axios";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // 1h
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const res = await axiosClient.post(
          `/auth/google`,
          {
            type: "password",
            username: credentials?.username,
            password: credentials?.password,
          }
        );
        if (res.data.EC == 0) {
          // console.log("[route] res credentials: ", res?.data);
          throw new Error(res.data.EM);
        }
        return res.data;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, trigger, user, account, profile, isNewUser }) {
      const googleIdToken = account?.id_token;
      token.idToken = googleIdToken
      if (trigger === "signIn" && account?.provider != "credentials") {
        const res = await axiosClient.post(`/auth/google`,
          {},
          {
            headers: {
              Authorization: `Bearer ${googleIdToken}`,
            },
          }
        );
        // console.log("[nextauth]: res login", res.data)
        if (res.data) {
          const cookieStore = await cookies();
          const accessToken = res.data.data.accessToken;

          cookieStore.set("access_token", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60,
          });
          token.access_token = accessToken;
          token.roles = res.data.data.roles;
        }
      }
      if (trigger === "signIn" && account?.provider === "credentials") {
        token.username = user?.DT?.username;
        token.email = user?.DT?.email;
        token.roles = user?.DT?.role;
        token.access_token = user?.DT?.access_token;
      }
      //console.log("[nextauth] token: ", token);
      console.log("JWT CALLBACK", { token, account, user })
      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.roles = token.roles;
        session.user.picture = token.picture
        session.access_token = token.access_token;
      }
      //console.log("[nextauth] session: ", session);
      console.log("SESSION CALLBACK", { session, token })
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
