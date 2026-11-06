import { Link } from "@tanstack/react-router";
import { Clock, ShieldCheck, ShieldX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useRoles } from "@/hooks/use-roles";
import { ProfessionalPageShell, useMyProProfile } from "./ProfessionalShell";
import { getFollowUps, getPatientRequests, getPatients } from "@/services/patientService";

export function ProfessionalDashboard() {
  const { isProfessional } = useRoles();
  const app = useMyProProfile();
  const d = app.data;
  const status = d?.status;
  const patients=useQuery({queryKey:["pro-patients-dashboard"],queryFn:getPatients});
  const requests=useQuery({queryKey:["pro-requests-dashboard"],queryFn:getPatientRequests});
  const followUps=useQuery({queryKey:["pro-followups-dashboard"],queryFn:getFollowUps});

  return (
    <ProfessionalPageShell
      title={isProfessional ? "Professional Dashboard" : "Apply for verification"}
      sub="Your profile is shown to PainEase users only after an administrator has checked your licence."
    >
      {app.isLoading ? <p className="text-muted-foreground">Loading…</p> : (
        <div className="space-y-5">
          <section className="card flex items-start gap-3">
            {status === "approved" ? <ShieldCheck className="h-6 w-6 shrink-0 text-teal" /> : status === "rejected" ? <ShieldX className="h-6 w-6 shrink-0 text-destructive" /> : <Clock className="h-6 w-6 shrink-0 text-muted-foreground" />}
            <div className="text-sm">
              <p className="font-semibold text-deep">{status === "approved" ? "Verified" : status === "rejected" ? "Not approved" : status === "pending" ? "Waiting for review" : "Not yet applied"}</p>
              <p className="text-muted-foreground">
                {status === "approved" ? "You appear as verified in Ease Support. Changing your name, profession or licence details sends your profile back for review."
                  : status === "rejected" ? `Reason: ${d?.review_note || "not given"}. Update your details to apply again.`
                  : status === "pending" ? "An administrator will check your licence details. You are not shown to users until approved."
                  : "Fill in your details to apply."}
              </p>
            </div>
          </section>

          {d && (
            <section className="card grid gap-2 text-sm sm:grid-cols-2">
              <p><span className="text-muted-foreground">Name:</span> {d.full_name}</p>
              <p><span className="text-muted-foreground">Profession:</span> {d.profession}</p>
              <p><span className="text-muted-foreground">Facility:</span> {d.facility || "—"}</p>
              <p><span className="text-muted-foreground">Location:</span> {[d.district, d.province].filter(Boolean).join(", ") || "—"}</p>
              <p className="sm:col-span-2"><span className="text-muted-foreground">Services:</span> {d.services.join(", ") || "—"}</p>
            </section>
          )}
          {!patients.isLoading&&!patients.isError&&<section className="grid gap-3 sm:grid-cols-4">{[
            ["Total patients",patients.data?.length??0],["Rising pain",patients.data?.filter((p)=>p.flag==="pain_rising").length??0],
            ["Inactive",patients.data?.filter((p)=>p.flag==="inactive").length??0],["Recent check-ins",patients.data?.filter((p)=>p.lastCheckInAt).length??0],
          ].map(([label,value])=><div key={String(label)} className="card"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-bold text-deep">{value}</p></div>)}</section>}

          <section className="grid gap-3 sm:grid-cols-2">
            <Link to="/professional/requests" className="card"><p className="text-xs text-muted-foreground">Incoming requests</p><p className="mt-1 text-2xl font-bold text-deep">{requests.data?.length ?? 0}</p><p className="mt-2 text-sm text-primary">Review requests</p></Link>
            <Link to="/professional/follow-ups" className="card"><p className="text-xs text-muted-foreground">Follow-ups due</p><p className="mt-1 text-2xl font-bold text-deep">{followUps.data?.filter((item)=>!item.completed).length ?? 0}</p><p className="mt-2 text-sm text-primary">View follow-ups</p></Link>
          </section>

          {!patients.isLoading && !patients.isError && (
            <section className="card">
              <h2 className="font-semibold text-deep">Needs attention</h2>
              <div className="mt-3 grid gap-2">
                {patients.data?.filter((item)=>item.flag==="pain_rising"||item.flag==="inactive").map((item)=>(
                  <Link key={item.patient.id} to="/professional/patients/$patientId" params={{patientId:item.patient.id}} className="flex items-center justify-between rounded-xl border px-3 py-3 text-sm">
                    <span><strong className="text-deep">{item.patient.name}</strong><span className="ml-2 text-muted-foreground">{item.flag==="pain_rising"?"Pain rising":"Inactive"}</span></span>
                    <span className="text-primary">Open</span>
                  </Link>
                ))}
                {!patients.data?.some((item)=>item.flag==="pain_rising"||item.flag==="inactive") && <p className="text-sm text-muted-foreground">No patients need immediate attention.</p>}
              </div>
            </section>
          )}

          <Link to="/professional/profile" className="btn-primary">{d ? "Edit my profile" : "Start application"}</Link>
        </div>
      )}
    </ProfessionalPageShell>
  );
}
