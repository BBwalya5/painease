import { createFileRoute } from "@tanstack/react-router";
import { AuditPage } from "@/modules/admin/Audit";

export const Route = createFileRoute("/_authenticated/admin/audit")({
  head: () => ({ meta: [{ title: "Admin Audit Log — PainEase" }, { name: "robots", content: "noindex" }] }),
  component: AuditPage,
});
