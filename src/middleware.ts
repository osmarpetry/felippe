import { NextResponse } from "next/server";
import { auth } from "../auth";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/signin"];
  const isPublicRoute = publicRoutes.some(
    (route) => nextUrl.pathname === route,
  );

  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!isLoggedIn) {
    const signInUrl = new URL("/auth/signin", nextUrl);
    signInUrl.searchParams.set(
      "callbackUrl",
      `${nextUrl.pathname}${nextUrl.search}`,
    );
    return NextResponse.redirect(signInUrl);
  }

  // Allow authenticated users to access all routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
