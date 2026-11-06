import { createFileRoute } from "@tanstack/react-router";
import { LibraryPage } from "@/modules/admin/Library";

export const Route = createFileRoute("/_authenticated/admin/library")({
  head: () => ({ meta: [{ title: "Admin Library — PainEase" }, { name: "robots", content: "noindex" }] }),
  component: LibraryPage,
});
