import { createFileRoute } from "@tanstack/react-router";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getProfile,updateProfile } from "@/services/profileService";
import { SignOutButton } from "@/components/SignOutButton";
import type { PainType } from "@/types";
export const Route=createFileRoute("/profile")({component:Profile});
function Profile(){
 const qc=useQueryClient();const q=useQuery({queryKey:["profile-page"],queryFn:getProfile});const [name,setName]=useState("");const [age,setAge]=useState("");const [painType,setPainType]=useState<PainType>("musculoskeletal");
 const mutation=useMutation({mutationFn:()=>updateProfile({name:name||q.data?.name,age:age?+age:null,painType}),onSuccess:()=>qc.invalidateQueries({queryKey:["profile-page"]})});
 if(q.isLoading)return <p className="card text-muted-foreground">Loading profile…</p>;if(q.isError)return <p role="alert" className="card text-destructive">Couldn't load profile.</p>;
 return <div><p className="text-sm font-semibold text-teal">Profile</p><h1 className="mb-5 text-3xl font-bold text-deep">{q.data?.name}</h1><section className="card max-w-xl space-y-4"><label className="block text-sm font-medium">Name<input className="mt-1 w-full rounded-xl border px-3 py-2" defaultValue={q.data?.name} onChange={(e)=>setName(e.target.value)}/></label><label className="block text-sm font-medium">Age<input className="mt-1 w-full rounded-xl border px-3 py-2" type="number" defaultValue={q.data?.age??""} onChange={(e)=>setAge(e.target.value)}/></label><label className="block text-sm font-medium">Pain type<select className="mt-1 w-full rounded-xl border px-3 py-2" defaultValue={q.data?.painType??"musculoskeletal"} onChange={(e)=>setPainType(e.target.value as PainType)}><option value="reproductive">Reproductive</option><option value="musculoskeletal">Musculoskeletal</option><option value="both">Both</option></select></label><button className="btn-primary" onClick={()=>mutation.mutate()}>{mutation.isPending?"Saving…":"Save profile"}</button></section><SignOutButton className="mt-4 max-w-xl" /></div>
}
