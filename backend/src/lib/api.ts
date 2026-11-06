// API client for the PainEase Node backend.
// Set VITE_API_BASE_URL to the backend URL and VITE_USE_MOCKS=false to use the real API.

export const API_BASE_URL = (
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) || "http://localhost:3001/api/v1"
).replace(/\/+$/, "");

/** Mock data is used unless VITE_USE_MOCKS is explicitly "false". */
export const USE_MOCKS = (import.meta.env["VITE_USE_MOCKS"] as string | undefined) !== "false";

const TOKEN_KEY = "painease.token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = { Accept: "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
  });
  const json = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (json && (json.message || json.error)) || `Request failed (${res.status})`;
    throw new ApiError(String(msg), res.status);
  }
  return (json && typeof json === "object" && "data" in json ? json.data : json) as T;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
};
