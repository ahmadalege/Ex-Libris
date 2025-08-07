// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData, sessionOptions } from "@/lib/session";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ message: "Logged out" });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  await session.destroy();
  return res;
}
