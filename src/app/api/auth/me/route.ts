// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    // 1) Create a Response stub so iron-session can decorate it if needed.
    const res = NextResponse.next();

    // 2) Load the session from req+res
    const session = await getIronSession<SessionData>(req, res, sessionOptions);

    console.log("SESSION DEBUG:", session);

    // 3) If not logged in, return 401
    if (!session.isLoggedIn) {
      return NextResponse.json({ isLoggedIn: false }, { status: 401 });
    }

    // 4) Otherwise return the user
    return NextResponse.json({
      user: {
        id: session.userId,
        username: session.username,
        email: session.email,
        isAdmin: session.isAdmin,
        createdAt: session.createdAt,
      },
    });
  } catch (err) {
    console.error("Get user error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
