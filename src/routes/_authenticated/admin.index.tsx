import { createFileRoute } from "@tanstack/react-router";
import { AdminDashboard } from "@/modules/admin/AdminDashboard";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — PainEase" },
      { name: "description", content: "Manage PainEase users, Ease Library content, verified facilities and professionals." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminDashboard,
});
