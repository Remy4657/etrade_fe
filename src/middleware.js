import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

const intlMiddleware = createMiddleware({
    locales: ["en", "vi"],
    defaultLocale: "vi",
    localeDetection: false,
});


export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("access_token")?.value;
    const PRIVATE_ROUTES = [
        "/cart",
        "/checkout",
        "/profile",
        "/order",
        "/dashboard",
    ];
    console.log("pathname: ", pathname)
    // ĐÃ LOGIN → KHÔNG ĐƯỢC VÀO LOGIN
    if (token && (pathname.includes("/sign-in") || pathname.includes("/sign-up"))) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    // CHƯA LOGIN → KHÔNG ĐƯỢC VÀO TRANG PRIVATE
    const isPrivateRoute = PRIVATE_ROUTES.some(route =>
        pathname.startsWith(route)
    );
    if (!token && isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    // 1️⃣ CHẠY i18n middleware TRƯỚC
    const response = intlMiddleware(request);
    // Nếu next-intl đã redirect → trả luôn
    if (response) return response;


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
