import { NextResponse } from "next/server";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";


export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "300d",
    });

    const cookie = serialize("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    return new NextResponse(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
        "Content-Type": "application/json",
      },
    });
  }

  return new NextResponse(JSON.stringify({ message: "Invalid credentials" }), {
    status: 401,
  });
}
