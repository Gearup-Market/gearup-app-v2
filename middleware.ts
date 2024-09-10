import { NextRequest, NextResponse } from "next/server";
import { parseJwt } from "./contexts/AuthContext";

// 1. Specify protected and public routes
const protectedRoutes = [
	"/user/dashboard",
    "/user/transactions",
    "/user/categories",
    "/user/wallet",
	"/user/settings",
	"/user/listings",
	"/admin/dashboard",
    "/admin/transactions",
    "/admin/categories",
    "/admin/wallet",
	"/admin/settings",
	"/admin/listings",
    "/admin/third-party-check",
    "/admin/blog",
	"/new-listing/images",
    "/new-listing/listing-details",
    "/new-listing/summary",
    "new-listing/type",
    "/new-listing/pricing",
    "/new-listing",
];

const publicRoutes = [
	"/login",
	"/signup",
	"/forgot-password",
	"/password-reset",
	"/reset",
	"/verified",
	"/verify"
];

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	// 3. Decrypt the session from the cookie
	const token = req.cookies.get("authToken");
	const decodedJwt = parseJwt(token?.value?.toString() ?? "");
	const isTokenValid = !!decodedJwt && decodedJwt?.exp * 1000 > Date.now();
    console.log(decodedJwt, "decodedJwt")
    console.log(token, "token")

	// 5. Redirect to /login if the user is not authenticated
	if (isProtectedRoute && !isTokenValid) {
        console.log(isTokenValid, "isTokenValid 1")
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}
    
	// 6. Redirect to /dashboard if the user is authenticated
	if (
        isPublicRoute &&
		isTokenValid &&
		!req.nextUrl.pathname.startsWith("/user" || "/admin")
	) {
        console.log(isTokenValid, "isTokenValid 2")
		return NextResponse.redirect(new URL("/user/dashboard", req.nextUrl));
	}
    console.log(isTokenValid, "isTokenValid 3")
	return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
	matcher: protectedRoutes
};
