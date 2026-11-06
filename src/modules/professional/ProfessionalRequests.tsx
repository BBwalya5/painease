import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { getPatientRequests, respondToPatientRequest } from "@/services/patientService";
import { ProfessionalPageShell } from "./ProfessionalShell";

export function ProfessionalRequests() {
  const qc = useQueryClient();
  const inviteLink = `${typeof window !== "undefined" ? window.location.origin : ""}/provider?code=PE-2041-ZM`;
  const requests = useQuery({ queryKey: ["professional-requests"], queryFn: getPatientRequests });
  const respond = useMutation({
    mutationFn: ({ id, accept }: { id:string; accept:boolean }) => respondToPatientRequest(id, accept),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["professional-requests"] }),
  });

  return (
    <ProfessionalPageShell title="Requests and invite" sub="Review requests sent by users and share your link or code.">
      <section className="card mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Your professional code</p>
        <div className="mt-2 flex items-center justify-between gap-3"><strong className="text-xl tracking-widest text-deep">PE-2041-ZM</strong><button type="button" className="chip" onClick={() => navigator.clipboard?.writeText("PE-2041-ZM")}>Copy code</button></div>
        <button type="button" className="mt-3 text-sm font-medium text-primary" onClick={() => navigator.clipboard?.writeText(inviteLink)}>Copy patient invite link</button>
      </section>
      <h2 className="mb-3 font-semibold text-deep">Incoming requests</h2>
      {requests.isLoading && <p className="card text-muted-foreground">Loading requests…</p>}
      {requests.isError && <p role="alert" className="card text-destructive">Requests could not be loaded.</p>}
      {!requests.isLoading && !requests.isError && (
        <div className="grid gap-3">
          {(requests.data ?? []).map((item) => (
            <article key={item.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <div><p className="font-semibold text-deep">{item.patientName}</p><p className="text-xs text-muted-foreground">{item.patientEmail}</p></div>
                <span className="chip">Pending</span>
              </div>
              {item.message && <p className="mt-3 text-sm text-muted-foreground">{item.message}</p>}
              <div className="mt-4 flex gap-2">
                <button className="btn-primary flex items-center gap-2" disabled={respond.isPending} onClick={() => respond.mutate({ id:item.id, accept:true })}><Check className="h-4 w-4" />Accept</button>
                <button className="rounded-xl border px-4 py-2 text-sm font-medium text-destructive" disabled={respond.isPending} onClick={() => respond.mutate({ id:item.id, accept:false })}><X className="mr-1 inline h-4 w-4" />Decline</button>
              </div>
            </article>
          ))}
          {(requests.data ?? []).length === 0 && <div className="card text-center text-sm text-muted-foreground">No pending requests.</div>}
        </div>
      )}
      {respond.isError && <p role="alert" className="mt-3 text-sm text-destructive">The request could not be updated.</p>}
    </ProfessionalPageShell>
  );
}
