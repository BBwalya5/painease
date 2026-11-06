import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getCurrentSession } from "@/services/authService";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async ({ location }) => {
    let session;
    try {
      session = await getCurrentSession();
    } catch {
      throw redirect({ to: "/auth", search: { redirect: location.pathname } });
    }

    if (!session?.user) {
      throw redirect({ to: "/auth", search: { redirect: location.pathname } });
    }
    if (location.pathname === "/admin" || location.pathname.startsWith("/admin/")) {
      if (session.user.role !== "admin") {
        throw redirect({ to: "/track" });
      }
    }
    if (location.pathname === "/professional" || location.pathname.startsWith("/professional/")) {
      if (session.user.role !== "professional") {
        throw redirect({ to: "/track" });
      }
    }
  },
  component: () => <Outlet />,
});
