// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid token:", error);
    return NextResponse.redirect(new URL("/signin", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"], // Protected routes
};
