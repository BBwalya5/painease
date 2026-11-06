import { env } from "../config/env.js";
import {
  getClearedSessionCookieOptions,
  getSessionCookieOptions,
  createSessionToken,
} from "../services/auth.service.js";
import { HttpError } from "../utils/httpError.js";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { database } from "../db/index.js";

export async function register(request, response, next) {
  try {
    const name = String(request.body?.name ?? "").trim();
    const email = String(request.body?.email ?? "").trim().toLowerCase();
    const password = String(request.body?.password ?? "");
    if (!name || name.length > 100) throw new HttpError(400, "Enter your full name");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Enter a valid email");
    if (password.length < 8 || password.length > 72) throw new HttpError(400, "Use at least 8 characters");

    const passwordHash = await bcrypt.hash(password, 12);
    const id = crypto.randomUUID();
    await database.query(
      "INSERT INTO users (id,email,password_hash,full_name,provider) VALUES (?,?,?,?,?)",
      [id, email, passwordHash, name, "email"],
    );
    await database.query("INSERT INTO user_roles (user_id,role) VALUES (?, 'user')", [id]);
    await database.query(
      `INSERT INTO profiles
       (id,full_name,pain_locations,conditions,symptoms,therapy_preferences)
       VALUES (?,?,?,?,?,?)`,
      [id, name, "[]", "[]", "[]", "[]"],
    );

    const roles = ["user"];
    const token = createSessionToken({ sub: id, email, fullName: name, roles });
    response.cookie(env.auth.cookieName, token, getSessionCookieOptions());
    response.status(201).json({
      success: true,
      data: { user: { id, email, fullName: name, roles } },
    });
  } catch (error) {
    if (error?.code === "ER_DUP_ENTRY") {
      return next(new HttpError(409, "An account with this email already exists"));
    }
    return next(error);
  }
}

export async function login(request, response, next) {
  try {
    const email = String(request.body?.email ?? "").trim().toLowerCase();
    const password = String(request.body?.password ?? "");
    if (!email || !password) throw new HttpError(400, "Email and password are required");

    const [users] = await database.query(
      "SELECT id,email,password_hash,full_name FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    const user = users[0];
    if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
      throw new HttpError(401, "Email or password is incorrect");
    }

    const [roleRows] = await database.query(
      "SELECT role FROM user_roles WHERE user_id = ? ORDER BY role",
      [user.id],
    );
    const roles = roleRows.map((row) => row.role);
    await database.query("UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?", [user.id]);

    const token = createSessionToken({
      sub: user.id,
      email: user.email,
      fullName: user.full_name,
      roles,
    });
    response.cookie(env.auth.cookieName, token, getSessionCookieOptions());
    response.status(200).json({
      success: true,
      data: { user: { id: user.id, email: user.email, fullName: user.full_name, roles } },
    });
  } catch (error) {
    return next(error);
  }
}

export function getCurrentSession(request, response) {
  response.status(200).json({
    success: true,
    data: {
      user: request.user,
    },
  });
}

export function createTestSession(request, response) {
  const token = createSessionToken({
    sub: request.body?.userId ?? "development-user",
    role: request.body?.role ?? "user",
  });

  response.cookie(
    env.auth.cookieName,
    token,
    getSessionCookieOptions(),
  );

  response.status(201).json({
    success: true,
    data: {
      message: "Development session created",
    },
  });
}

export async function forgotPassword(request, response, next) {
  try {
    const email = String(request.body?.email ?? "").trim().toLowerCase();
    let resetToken = null;
    const [users] = await database.query(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email],
    );
    if (users[0]) {
      resetToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");
      await database.query(
        `INSERT INTO password_reset_tokens (id,user_id,token_hash,expires_at)
         VALUES (?,?,?,DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 HOUR))`,
        [crypto.randomUUID(), users[0].id, tokenHash],
      );
    }
    response.status(200).json({
      success: true,
      data: {
        message: "If that email has an account, a reset link has been created.",
        ...(env.nodeEnv !== "production" && resetToken ? { resetToken } : {}),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function resetPassword(request, response, next) {
  try {
    const token = String(request.body?.token ?? "");
    const password = String(request.body?.password ?? "");
    if (!token) throw new HttpError(400, "Reset token is required");
    if (password.length < 8 || password.length > 72) {
      throw new HttpError(400, "Use at least 8 characters");
    }
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const [tokens] = await database.query(
      `SELECT user_id FROM password_reset_tokens
       WHERE token_hash=? AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP
       LIMIT 1`,
      [tokenHash],
    );
    if (!tokens[0]) throw new HttpError(400, "Reset link is invalid or expired");
    const passwordHash = await bcrypt.hash(password, 12);
    await database.query("UPDATE users SET password_hash=? WHERE id=?", [
      passwordHash,
      tokens[0].user_id,
    ]);
    await database.query(
      "UPDATE password_reset_tokens SET used_at=CURRENT_TIMESTAMP WHERE token_hash=?",
      [tokenHash],
    );
    response.status(200).json({
      success: true,
      data: { message: "Password updated" },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(_request, response) {
  response.clearCookie(
    env.auth.cookieName,
    getClearedSessionCookieOptions(),
  );

  response.status(200).json({
    success: true,
    data: {
      message: "Signed out",
    },
  });
}
