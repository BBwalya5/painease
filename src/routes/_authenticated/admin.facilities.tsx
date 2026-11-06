import { createFileRoute } from "@tanstack/react-router";
import { FacilitiesPage } from "@/modules/admin/Facilities";

export const Route = createFileRoute("/_authenticated/admin/facilities")({
  head: () => ({ meta: [{ title: "Admin Facilities — PainEase" }, { name: "robots", content: "noindex" }] }),
  component: FacilitiesPage,
});
