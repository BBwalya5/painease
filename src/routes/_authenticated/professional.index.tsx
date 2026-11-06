import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalDashboard } from "@/modules/professional/ProfessionalDashboard";

export const Route = createFileRoute("/_authenticated/professional/")({
  head: () => ({
    meta: [
      { title: "Professional Dashboard — PainEase" },
      { name: "description", content: "Healthcare professionals manage their PainEase profile, credentials and services." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfessionalDashboard,
});
