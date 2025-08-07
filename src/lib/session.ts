import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  isAdmin?: boolean;
  email?: string;
  username?: string;
  createdAt?: string;
  isLoggedIn?: boolean;
}
export const defaultSession: SessionData = {
  userId: "",
  isAdmin: false,
  email: "",
  username: "",
  createdAt: "",
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD as string,
  cookieName: "ex-libris",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
    httpOnly: true,
    path: "/",
  },
};
