import type { ReactNode } from "react";
import { PageHeader } from "@/components/AppShell";
import { useSessionUser } from "@/hooks/use-session";

export type ProProfile = {
  full_name: string;
  profession: string;
  license_number: string;
  licensing_body: string | null;
  facility: string | null;
  province: string | null;
  district: string | null;
  services: string[];
  bio: string | null;
  status: "pending" | "approved" | "rejected";
  review_note: string | null;
} | null;

/** Shared query for the signed-in professional's own profile. */
export function useMyProProfile() {
  const { session, ready } = useSessionUser();
  const profile: ProProfile = session?.practitioner ? {
    full_name: session.practitioner.name, profession: session.practitioner.profession,
    license_number: session.practitioner.licenseNumber, licensing_body:null,
    facility:session.practitioner.clinic,province:"Lusaka",district:"Lusaka",
    services:["Pain support"],bio:null,status:session.practitioner.status,review_note:session.practitioner.rejectionReason,
  } : null;
  return { data:profile,isLoading:!ready,isSuccess:ready,isError:false,error:null };
}

export function ProfessionalPageShell({ title, sub, children }: { title: string; sub: string; children: ReactNode }) {
  return (
    <div>
      <PageHeader eyebrow="For healthcare professionals" title={title} sub={sub} />
      {children}
    </div>
  );
}
