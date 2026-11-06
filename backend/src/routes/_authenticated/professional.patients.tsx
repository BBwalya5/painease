import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalPatients } from "@/modules/professional/ProfessionalPatients";

export const Route = createFileRoute("/_authenticated/professional/patients")({
  component: ProfessionalPatients,
});
