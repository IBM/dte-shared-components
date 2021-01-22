import { serialize } from "cookie";
import cookie from "js-cookie";

export const setCookie = (key, value, sessionCookie = false) => {
  if (process.browser) {
    let options = { expires: sessionCookie ? 1 / 288 : 1 };
    if (process.env.COOKIE_DOMAIN) options.domain = process.env.COOKIE_DOMAIN;
    cookie.set(key, value, options);
  }
};

export const removeCookie = (key, opt) => {
  if (process.browser) cookie.remove(key, opt);
};

export const getCookie = (key, req) =>
  process.browser ? getCookieFromBrowser(key) : getCookieFromServer(key, req);

const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (key, req) => {
  if (!req || !req.headers || !req.headers.cookie) return undefined;
  const rawCookie = req.headers.cookie.split(";").find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) return undefined;
  return decodeURIComponent(rawCookie.split("=")[1]);
};

const setCookies = (res, name, value, options = {}) => {
  const stringValue = typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);
  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options.maxAge);
    options.maxAge /= 1000;
  }
  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

export const withCookies = (handler) => (req, res) => {
  res.cookie = (name, value, options) => setCookies(res, name, value, options);
  return handler(req, res);
};
