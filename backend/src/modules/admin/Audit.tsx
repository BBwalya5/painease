import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "@/services/adminService";
import { AdminError,AdminPageShell } from "./AdminShell";
export function AuditPage(){return <AdminPageShell title="Compliance and audit trail" sub="Consent activity and practitioner access records."><Audit/></AdminPageShell>}
export function Audit(){const q=useQuery({queryKey:["admin-audit"],queryFn:getAuditLogs});if(q.isLoading)return <p>Loading audit trail…</p>;if(q.isError)return <AdminError error={q.error}/>;return <div className="space-y-2">{q.data?.map((item)=><div key={item.id} className="card"><div className="flex justify-between gap-3"><p className="font-semibold text-deep">{item.detail}</p><p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p></div><p className="mt-1 text-xs text-muted-foreground">{item.actorName} · {item.action}</p></div>)}</div>}
