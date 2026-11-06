import type { Role } from "@/types";

export function roleHome(role: Role) {
  return role === "admin" ? "/admin" : role === "professional" ? "/professional" : "/track";
}

export function routeRedirect(path: string, role: Role | null) {
  const authPage = path === "/auth" || path === "/reset-password";
  if (!role) return authPage ? null : "/auth";
  if (authPage) return path === "/auth" ? roleHome(role) : null;
  const requiredRole = path === "/admin" || path.startsWith("/admin/")
    ? "admin"
    : path === "/professional" || path.startsWith("/professional/")
      ? "professional" : "user";
  return requiredRole === role ? null : roleHome(role);
}