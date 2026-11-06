import { createFileRoute } from "@tanstack/react-router";
import { UsersPage } from "@/modules/admin/Users";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({ meta: [{ title: "Admin Users — PainEase" }, { name: "robots", content: "noindex" }] }),
  component: UsersPage,
});
