import { useState } from "react";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { getAdminUsers,setUserStatus } from "@/services/adminService";
import { AdminError,AdminPageShell } from "./AdminShell";
export function UsersPage(){return <AdminPageShell title="User management" sub="Search, view, suspend and reactivate accounts."><Users/></AdminPageShell>}
export function Users(){
 const [search,setSearch]=useState("");const qc=useQueryClient();const q=useQuery({queryKey:["admin-users"],queryFn:getAdminUsers});
 const mutation=useMutation({mutationFn:(args:{id:string;status:"active"|"suspended"})=>setUserStatus(args.id,args.status),onSuccess:()=>qc.invalidateQueries({queryKey:["admin-users"]})});
 if(q.isLoading)return <p className="text-muted-foreground">Loading users…</p>;if(q.isError)return <AdminError error={q.error}/>;
 const users=q.data?.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase())||user.email.toLowerCase().includes(search.toLowerCase()))??[];
 return <><input className="mb-4 w-full max-w-md rounded-xl border px-3 py-2" placeholder="Search users" value={search} onChange={(e)=>setSearch(e.target.value)}/><div className="space-y-2">{users.map((user)=><div key={user.id} className="card flex flex-wrap items-center justify-between gap-3"><div><p className="font-semibold text-deep">{user.name}</p><p className="text-xs text-muted-foreground">{user.email} · {user.role}</p></div><button className={user.status==="active"?"text-sm font-semibold text-destructive":"text-sm font-semibold text-teal"} onClick={()=>mutation.mutate({id:user.id,status:user.status==="active"?"suspended":"active"})}>{user.status==="active"?"Suspend":"Reactivate"}</button></div>)}</div></>
}
