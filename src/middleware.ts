import { auth } from "../auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl, auth: session } = req;
  const isLoggedIn = !!session?.user;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/signin"];
  const isPublicRoute = publicRoutes.some(
    (route) => nextUrl.pathname === route,
  );

  console.log(`Middleware: ${nextUrl.pathname}, Logged In: ${isLoggedIn}`);
  // Allow access to public routes
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // For all other routes, require authentication
  if (!isLoggedIn) {
    // Redirect unauthenticated users to home page
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  // Allow authenticated users to access all routes
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
