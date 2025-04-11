import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value; // Get the role from cookies
  const navigatingRoute = request.nextUrl.pathname;

  if (!role) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Role from cookie:", role);

  if (role === "employer" && navigatingRoute.startsWith("/Dashboard")) {
    return NextResponse.redirect(new URL("/Recruiterboard", request.url));
  }

  if (role === "jobseeker" && navigatingRoute.startsWith("/Recruiterboard")) {
    return NextResponse.redirect(new URL("/Dashboard", request.url));
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
