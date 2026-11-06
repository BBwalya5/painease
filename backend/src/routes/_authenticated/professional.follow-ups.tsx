import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalFollowUps } from "@/modules/professional/ProfessionalFollowUps";

export const Route = createFileRoute("/_authenticated/professional/follow-ups")({
  component: ProfessionalFollowUps,
});
