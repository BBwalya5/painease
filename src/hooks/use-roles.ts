import { useSessionUser } from "@/hooks/use-session";

export type AppRole = "admin" | "professional" | "user";

/** Roles are read from the database (RLS: own rows only). UI hints only — every write is enforced server-side. */
export function useRoles() {
  const { user, ready } = useSessionUser();
  const roles: AppRole[] = user?.role ? [user.role] : [];
  return {
    user,
    ready,
    roles,
    isAdmin: roles.includes("admin"),
    isProfessional: roles.includes("professional"),
  };
}

export async function homeForCurrentUser(): Promise<string> {
  const { getCurrentSession } = await import("@/services/authService");
  try {
    const session = await getCurrentSession();
    if (!session) return "/track";
    if (session.user.role === "admin") return "/admin";
    if (session.user.role === "professional") return "/professional";
    return "/track";
  } catch { return "/track"; }
}
