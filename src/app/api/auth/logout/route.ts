// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  // 1) Create a response placeholder
  const res = NextResponse.json({ message: "Logged out" });

  // 2) Tie your session onto that response
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  // 3) Destroy the session (clears the cookie)
  await session.destroy(); // ← iron-session will emit Set-Cookie: ex-libris=; Max-Age=0

  // 4) Return the response
  return res;
}
