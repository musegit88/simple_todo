import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/home") {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }
}

export const config = {
  matcher: ["/home"],
};
