import { createFileRoute } from "@tanstack/react-router";
import { ProfessionalPatient } from "@/modules/professional/ProfessionalPatient";

export const Route = createFileRoute("/_authenticated/professional/patients/$patientId")({
  component: () => {
    const { patientId } = Route.useParams();
    return <ProfessionalPatient patientId={patientId} />;
  },
});
