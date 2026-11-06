import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalRequests } from "@/modules/professional/ProfessionalRequests";

export const Route = createFileRoute("/_authenticated/professional/requests")({
  component: ProfessionalRequests,
});
