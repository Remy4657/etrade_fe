import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
    locales: ["en", "vi"],
    defaultLocale: "en",
    localeDetection: false,
});


export function middleware(request) {
    // 1️⃣ CHẠY i18n middleware TRƯỚC
    const response = intlMiddleware(request);

    // Nếu next-intl đã redirect → trả luôn
    if (response) return response;

    const token = request.cookies.get("access_token")?.value;
    console.log("middleware token:", token) // sẽ thấy
    const { pathname } = request.nextUrl;
    const PRIVATE_ROUTES = [
        "/cart",
        "/checkout",
        "/profile",
        "/order",
        "/dashboard",
    ];
    console.log("pathname: ", pathname)
    // ĐÃ LOGIN → KHÔNG ĐƯỢC VÀO LOGIN
    if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
        console.log("zoday")
        return NextResponse.redirect(new URL("/", request.url));
    }
    // CHƯA LOGIN → KHÔNG ĐƯỢC VÀO TRANG PRIVATE
    const isPrivateRoute = PRIVATE_ROUTES.some(route =>
        pathname.startsWith(route)
    );
    console.log("!isToken: ", !token)
    if (!token && isPrivateRoute) {
        console.log("[middleware] redirect login")
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
}
export const config = {
    matcher: [
        "/sign-in",
        "/sign-up",
        "/cart/:path*",
        "/checkout/:path*",
        "/profile/:path*",
        "/order/:path*",
        "/wishlist/:path*",
        "/dashboard/:path*",
        "/profile/:path*",
        "/(vi|en)/:path*",
        "/((?!api|_next|.*\\..*).*)"],
};
