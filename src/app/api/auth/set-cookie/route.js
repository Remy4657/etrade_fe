import { cookies } from "next/headers"

export async function POST(req) {
  const { accessToken } = await req.json()
  console.log("[set-cookie] accessToken: ", accessToken)
  cookies().set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  })

  return Response.json({ ok: true })
}
