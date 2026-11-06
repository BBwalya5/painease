import "dotenv/config";

const nodeEnv = process.env.NODE_ENV ?? "development";
const port = Number(process.env.PORT ?? 3001);
const databasePort = Number(process.env.DB_PORT ?? 3306);
const authCookieMaxAgeMs = Number(process.env.AUTH_COOKIE_MAX_AGE_MS ?? 604800000);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port");
}

if (!Number.isInteger(databasePort) || databasePort < 1 || databasePort > 65535) {
  throw new Error("DB_PORT must be a valid TCP port");
}

if (!Number.isSafeInteger(authCookieMaxAgeMs) || authCookieMaxAgeMs < 1) {
  throw new Error("AUTH_COOKIE_MAX_AGE_MS must be a positive number");
}

const authSecret = process.env.AUTH_SECRET;
const cookieSameSite = (process.env.AUTH_COOKIE_SAME_SITE ?? "lax").toLowerCase();

if (!["lax", "strict", "none"].includes(cookieSameSite)) {
  throw new Error("AUTH_COOKIE_SAME_SITE must be lax, strict, or none");
}

if (cookieSameSite === "none" && nodeEnv !== "production") {
  console.warn(
    "AUTH_COOKIE_SAME_SITE=none requires Secure cookies and HTTPS in production",
  );
}

if (nodeEnv === "production" && cookieSameSite === "none" && !process.env.TRUST_PROXY) {
  throw new Error("Set TRUST_PROXY when the production server is behind HTTPS proxy");
}

if (nodeEnv === "production" && (!authSecret || authSecret.length < 32)) {
  throw new Error("AUTH_SECRET must contain at least 32 characters in production");
}

export const env = Object.freeze({
  nodeEnv,
  port,
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3000",
  clientUrls: [
    ...new Set(
      (process.env.CLIENT_URLS ?? process.env.CLIENT_URL ?? "http://localhost:3000")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
  ],
  isProduction: nodeEnv === "production",
  auth: Object.freeze({
    secret: authSecret ?? "development-only-change-this-secret",
    cookieName: process.env.AUTH_COOKIE_NAME ?? "painease_session",
    cookieMaxAgeMs: authCookieMaxAgeMs,
    cookieSameSite,
    cookieDomain: process.env.AUTH_COOKIE_DOMAIN || undefined,
  }),
  database: Object.freeze({
    host: process.env.DB_HOST ?? "localhost",
    port: databasePort,
    name: process.env.DB_NAME ?? "painease",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
  }),
});
