import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.NO_SECRET,
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
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          {
            type: "password",
            username: credentials?.username,
            password: credentials?.password,
          }
        );
        if (res.data.EC == 0) {
          console.log("[route] res credentials: ", res?.data);
          throw new Error(res.data.EM);
        }
        return res.data;
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, trigger, user, account, profile, isNewUser }) {
      console.log("[raw] account: ", account)
      const googleIdToken = account?.id_token;
      token.idToken = googleIdToken
      console.log("[raw] token: ", token)
      if (trigger === "signIn" && account?.provider != "credentials") {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
          {},
          {
            headers: {
              Authorization: `Bearer ${googleIdToken}`,
            },
          }
        );
        console.log("[res login]: ", res.data)
        if (res.data) {
          token.access_token = res.data.accessToken;
          token.roles = res.data.roles;
        }
      }
      if (trigger === "signIn" && account?.provider === "credentials") {
        //@ts-ignore
        token.username = user?.DT?.username;
        //@ts-ignore
        token.email = user?.DT?.email;
        //@ts-ignore
        token.roles = user?.DT?.role;
        //@ts-ignore
        token.access_token = user?.DT?.access_token;
        //@ts-ignore
        token.refresh_token = user?.DT?.refresh_token;
      }
      console.log("[route] token: ", token);
      console.log("[route] user: ", user);

      return token;
    },
    async session({ session, user, token }) {
      if (token) {
        session.user.email = token.email;
        session.user.roles = token.roles;
        session.user.picture = token.picture
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
      }
      console.log("[route] session: ", session);
      return session;
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
