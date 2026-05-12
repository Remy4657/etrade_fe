import NextAuth from "next-auth";
import { cookies } from "next/headers"
import GoogleProvider from "next-auth/providers/google";
import axiosClient from "@/utils/axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const dynamic = "force-dynamic";

export const authOptions = {
  trustHost: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    maxAge: 60 * 60, // set session max age to 1 hour (3600 seconds)
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
    // flow khi login bằng google: sau khi người dùng chọn tài khoản google, google sẽ trả về một id_token, sau đó callback jwt sẽ được gọi với trigger là "signIn" và account.provider là "google", lúc này mình sẽ gửi id_token này lên backend để backend xác thực và trả về access_token, sau đó mình sẽ lưu access_token này vào cookie và trả về cho client
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: "/sign-in",
  },
  // callback này sẽ được gọi sau khi người dùng đăng nhập thành công, nó sẽ nhận được token, trigger, user, account, profile, 
  // isNewUser làm tham số, trong đó token là token hiện tại của người dùng, trigger là sự kiện kích hoạt callback (ví dụ: "signIn", 
  // "signOut", "update"), user là thông tin người dùng, account là thông tin tài khoản (bao gồm provider và id_token nếu đăng nhập 
  // bằng google), profile là thông tin hồ sơ người dùng từ provider, isNewUser là boolean cho biết người dùng có phải là người dùng 
  // mới hay không. Trong callback này mình sẽ kiểm tra nếu trigger là "signIn" và account.provider không phải là "credentials" 
  // (tức là đăng nhập bằng google), thì mình sẽ gửi id_token lên backend để xác thực và lấy access_token, sau đó lưu access_token 
  // vào cookie và trả về token mới có access_token và roles. Nếu trigger là "signIn" và account.provider là "credentials", thì mình sẽ
  // lấy thông tin username, email, role và access_token từ user.DT và trả về token mới.
  callbacks: {
    async jwt({ token, trigger, user, account, profile, isNewUser }) {
      const googleIdToken = account?.id_token; // Lấy id_token từ account nếu đăng nhập bằng google
      token.idToken = googleIdToken
      if (trigger === "signIn" && account?.provider != "credentials") { // trường hợp đăng nhập bằng google
        const res = await axiosClient.post(`/auth/google`, // Gửi id_token lên backend để xác thực và lấy access_token
          {},
          {
            headers: {
              Authorization: `Bearer ${googleIdToken}`,
            },
          }
        );
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
    // callback này sẽ được gọi khi client gọi getSession để lấy thông tin session, nó sẽ nhận được session, user, token làm tham số, 
    // trong đó session là session hiện tại của người dùng, user là thông tin người dùng, token là token hiện tại của người dùng 
    // (đã được cập nhật trong callback jwt). Trong callback này mình sẽ kiểm tra nếu token tồn tại thì mình sẽ gán email, roles, 
    // picture và access_token từ token vào session.user và session.access_token, sau đó trả về session mới.
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
