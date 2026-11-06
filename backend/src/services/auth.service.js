import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export function createSessionToken(payload) {
  return jwt.sign(payload, env.auth.secret, {
    expiresIn: Math.floor(env.auth.cookieMaxAgeMs / 1000),
    issuer: "painease-backend",
    audience: "painease-client",
  });
}

export function verifySessionToken(token) {
  return jwt.verify(token, env.auth.secret, {
    issuer: "painease-backend",
    audience: "painease-client",
  });
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: env.auth.cookieSameSite,
    path: "/",
    maxAge: env.auth.cookieMaxAgeMs,
    ...(env.auth.cookieDomain ? { domain: env.auth.cookieDomain } : {}),
  };
}

export function getClearedSessionCookieOptions() {
  const { maxAge: _maxAge, ...options } = getSessionCookieOptions();
  return {
    ...options,
    expires: new Date(0),
  };
}
