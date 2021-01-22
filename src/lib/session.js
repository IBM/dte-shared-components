import { withIronSession } from "next-iron-session";

const SESSION_MAX_HOURS = parseInt(process.env.SESSION_MAX_HOURS || 18);
const COOKIE_MAX_AGE = 60 * 60 * SESSION_MAX_HOURS * 1000; // 18 hours to match max session for ibmid

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.SECRET,
    cookieName: process.env.SESSION_NAME,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: COOKIE_MAX_AGE - 60,
      path: "/",
    },
    ttl: COOKIE_MAX_AGE,
  });
}
