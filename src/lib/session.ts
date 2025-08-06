import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  email?: string;
  isAdmin?: boolean;
  isLoggedIn?: boolean;
}
export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET!,
  cookieName: "ex-libris",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "lax",
  },
};
