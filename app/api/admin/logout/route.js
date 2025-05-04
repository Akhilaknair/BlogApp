import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function GET(request) {
  const cookie = serialize("admin-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1,
    path: "/",
  });

  const loginUrl = new URL("/admin/login", request.url);
  const response = NextResponse.redirect(loginUrl);

  response.headers.set("Set-Cookie", cookie);

  return response;
}
