import { cookies } from "next/headers"

export async function POST(req) {
  const res = await req.json()
  const cookieStore = await cookies();
  cookieStore.set("access_token", res.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  })

  return Response.json({ ok: true })
}
