import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getConsentLinks, requestConsent, revokeConsent, updateConsent } from "@/services/consentService";

export const Route = createFileRoute("/provider")({ component: Provider });

function Provider() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["consents"], queryFn: getConsentLinks });
  const [code, setCode] = useState("");
  const request = useMutation({
    mutationFn: () => requestConsent(code),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["consents"] }),
  });
  const update = useMutation({
    mutationFn: (args: { id: string; permissions: { painHistory: boolean; deviceSessions: boolean; notes: boolean } }) =>
      updateConsent(args.id, args.permissions),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["consents"] }),
  });
  const revoke = useMutation({
    mutationFn: (id: string) => revokeConsent(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["consents"] }),
  });

  if (query.isLoading) return <p className="card text-muted-foreground">Loading practitioner access…</p>;
  if (query.isError) return <p role="alert" className="card text-destructive">Couldn't load sharing settings.</p>;

  return (
    <div>
      <p className="text-sm font-semibold text-teal">Share with practitioner</p>
      <h1 className="mb-5 text-3xl font-bold text-deep">Practitioner access</h1>
      <section className="card">
        <h2 className="font-semibold">Link a practitioner</h2>
        <div className="mt-3 flex gap-2">
          <input className="min-w-0 flex-1 rounded-xl border px-3" placeholder="Practitioner code or email" value={code} onChange={(e) => setCode(e.target.value)} />
          <button className="btn-primary" disabled={!code || request.isPending} onClick={() => request.mutate()}>Send request</button>
        </div>
      </section>
      {query.data?.length === 0 && <p className="mt-4 card text-muted-foreground">No practitioner links yet.</p>}
      <div className="mt-4 space-y-3">
        {query.data?.map((link) => (
          <section key={link.id} className="card">
            <div className="flex justify-between">
              <div><p className="font-semibold text-deep">Linked practitioner</p><p className="text-xs capitalize text-muted-foreground">{link.status}</p></div>
              {link.status === "active" && <button className="text-sm font-semibold text-destructive" onClick={() => revoke.mutate(link.id)}>Revoke access</button>}
            </div>
            <div className="mt-4 space-y-2">
              {(["painHistory", "deviceSessions", "notes"] as const).map((key) => (
                <label key={key} className="flex items-center gap-2 text-sm capitalize">
                  <input type="checkbox" checked={link.permissions[key]} disabled={link.status === "revoked"} onChange={(e) =>
                    update.mutate({ id: link.id, permissions: { ...link.permissions, [key]: e.target.checked } })
                  } />
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
