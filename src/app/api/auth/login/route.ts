import prisma from "@/lib/db";
import { SessionData, sessionOptions } from "@/lib/session";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin ?? false,
        isLoggedIn: true,
      },
    });

    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.userId = user.id;
    session.username = user.username;
    session.email = user.email;
    session.isAdmin = user.isAdmin ?? false;
    session.isLoggedIn = true;
    session.createdAt = new Date().toISOString();
    await session.save();

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }
    session.userId = user.id;
    session.username = user.username;
    session.email = user.email;
    session.isLoggedIn = true;
    session.isAdmin = user.isAdmin ?? false;
    await session.save();

    return res;
    return NextResponse.redirect("/");
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
