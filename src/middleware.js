import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("access_token")?.value;
    const { pathname } = request.nextUrl;


    // ĐÃ LOGIN → KHÔNG ĐƯỢC VÀO LOGIN
    if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    if (!token && pathname.startsWith("/cart")) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // CHƯA LOGIN → KHÔNG ĐƯỢC VÀO TRANG PRIVATE
    // if (!token && pathname.startsWith("/profile")) {
    //     return NextResponse.redirect(new URL("/login", request.url));
    // }

    return NextResponse.next();
}
export const config = {
    matcher: ["/sign-in", "/sign-up", "/cart", "/profile/:path*"],
};
