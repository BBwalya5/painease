import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalsPage } from "@/modules/admin/Professionals";

export const Route = createFileRoute("/_authenticated/admin/professionals")({
  head: () => ({ meta: [{ title: "Admin Professionals — PainEase" }, { name: "robots", content: "noindex" }] }),
  component: ProfessionalsPage,
});
