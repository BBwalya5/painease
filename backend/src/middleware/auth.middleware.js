import { env } from "../config/env.js";
import { verifySessionToken } from "../services/auth.service.js";
import { HttpError } from "../utils/httpError.js";

export function requireAuth(request, _response, next) {
  const token = request.cookies?.[env.auth.cookieName];

  if (!token) {
    return next(new HttpError(401, "Authentication required"));
  }

  try {
    request.user = verifySessionToken(token);
    return next();
  } catch {
    return next(new HttpError(401, "Authentication session is invalid or expired"));
  }
}

export function requireRole(...allowedRoles) {
  return (request, _response, next) => {
    if (!request.user) {
      return next(new HttpError(401, "Authentication required"));
    }

    const roles = Array.isArray(request.user.roles)
      ? request.user.roles
      : [request.user.role];

    if (!roles.some((role) => allowedRoles.includes(role))) {
      return next(new HttpError(403, "You do not have permission to perform this action"));
    }

    return next();
  };
}
