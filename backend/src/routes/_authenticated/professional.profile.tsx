import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalProfile } from "@/modules/professional/ProfessionalProfile";

export const Route = createFileRoute("/_authenticated/professional/profile")({
  head: () => ({
    meta: [
      { title: "My Professional Profile — PainEase" },
      { name: "description", content: "Edit your licence details, facility and services on PainEase." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfessionalProfile,
});
