import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SessionData, sessionOptions } from "@/lib/session";

export async function POST() {
  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      sessionOptions
    );
    session.destroy();

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
