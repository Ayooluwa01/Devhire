import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "next-auth/react";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value; // Read token from cookies
  const navigatingRoute = request.nextUrl.pathname;

  if (!role) {
    // Redirect unauthenticated users
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if (!role && navigatingRoute.startsWith("/recruiterboard")) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  if (role === "employer" && navigatingRoute.startsWith("/Dashboard")) {
    return NextResponse.redirect(new URL("/Recruiterboard", request.url));
  }

  if (role === "jobseeker" && navigatingRoute.startsWith("/Dashboard")) {
    console.log("Accessing dashboard");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/Dashboard/:path*",
    "/Dashboard",
    "/Recruiterboard",
    "/Recruiterboard/:path",
  ],
};
