import { useQuery } from "@tanstack/react-query";
import { getAdminDevices } from "@/services/adminService";
import { AdminError,AdminPageShell } from "./AdminShell";
export function FacilitiesPage(){return <AdminPageShell title="Device registry" sub="Add and manage wearable inventory and assignments."><Facilities/></AdminPageShell>}
export function Facilities(){const q=useQuery({queryKey:["admin-devices"],queryFn:getAdminDevices});if(q.isLoading)return <p>Loading devices…</p>;if(q.isError)return <AdminError error={q.error}/>;return <div className="space-y-2">{q.data?.map((item)=><div key={item.id} className="card flex flex-wrap justify-between gap-3"><div><p className="font-semibold text-deep">{item.serial}</p><p className="text-xs capitalize text-muted-foreground">{item.type.replaceAll("_"," ")}</p></div><span className="chip capitalize">{item.status}</span></div>)}</div>}
