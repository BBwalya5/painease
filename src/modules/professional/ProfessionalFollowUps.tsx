import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarCheck } from "lucide-react";
import { completeFollowUp, getFollowUps } from "@/services/patientService";
import { ProfessionalPageShell } from "./ProfessionalShell";

export function ProfessionalFollowUps() {
  const qc = useQueryClient();
  const followUps = useQuery({ queryKey:["professional-follow-ups"], queryFn:getFollowUps });
  const complete = useMutation({
    mutationFn: completeFollowUp,
    onSuccess: () => qc.invalidateQueries({ queryKey:["professional-follow-ups"] }),
  });
  const pending = (followUps.data ?? []).filter((item) => !item.completed);

  return (
    <ProfessionalPageShell title="Follow-ups" sub="Upcoming patient reviews and follow-up actions.">
      {followUps.isLoading && <p className="card text-muted-foreground">Loading follow-ups…</p>}
      {followUps.isError && <p role="alert" className="card text-destructive">Follow-ups could not be loaded.</p>}
      {!followUps.isLoading && !followUps.isError && (
        <div className="grid gap-3">
          {pending.map((item) => (
            <article key={item.id} className="card flex items-start justify-between gap-4">
              <div className="flex gap-3"><CalendarCheck className="mt-0.5 h-5 w-5 text-teal" /><div><p className="font-semibold text-deep">{item.patientName}</p><p className="mt-1 text-sm text-muted-foreground">{item.reason}</p><p className="mt-2 text-xs text-muted-foreground">{new Date(item.dueAt).toLocaleString()}</p></div></div>
              <button className="chip whitespace-nowrap" disabled={complete.isPending} onClick={() => complete.mutate(item.id)}>Complete</button>
            </article>
          ))}
          {pending.length === 0 && <div className="card text-center text-sm text-muted-foreground">No follow-ups are due.</div>}
        </div>
      )}
    </ProfessionalPageShell>
  );
}
