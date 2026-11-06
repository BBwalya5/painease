import assert from "node:assert/strict";
import { test } from "node:test";
import {
  createSessionToken,
  getSessionCookieOptions,
  verifySessionToken,
} from "../src/services/auth.service.js";

test("session tokens can be created and verified", () => {
  const token = createSessionToken({
    sub: "user-123",
    role: "professional",
  });

  const payload = verifySessionToken(token);

  assert.equal(payload.sub, "user-123");
  assert.equal(payload.role, "professional");
  assert.equal(payload.iss, "painease-backend");
  assert.equal(payload.aud, "painease-client");
});

test("session cookies are HTTP-only and use the configured same-site policy", () => {
  const options = getSessionCookieOptions();

  assert.equal(options.httpOnly, true);
  assert.equal(["lax", "strict", "none"].includes(options.sameSite), true);
  assert.equal(options.path, "/");
  assert.equal(typeof options.maxAge, "number");
});
