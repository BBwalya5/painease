import { env } from "../config/env.js";
import { HttpError } from "../utils/httpError.js";

const unsafeMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export function originGuard(request, _response, next) {
  if (!unsafeMethods.has(request.method)) {
    return next();
  }

  const origin = request.headers.origin;
  if (!origin) {
    return next();
  }

  if (env.clientUrls.includes(origin)) {
    return next();
  }

  return next(new HttpError(403, `Request origin is not allowed: ${origin}`));
}
