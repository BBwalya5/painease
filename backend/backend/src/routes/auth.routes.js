import { Router } from "express";
import {
  createTestSession,
  getCurrentSession,
  logout,
  register,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { env } from "../config/env.js";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/session", requireAuth, getCurrentSession);
authRouter.post("/logout", logout);

if (!env.isProduction) {
  authRouter.post("/development-session", createTestSession);
}
