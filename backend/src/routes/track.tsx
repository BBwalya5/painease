import { createFileRoute } from "@tanstack/react-router";
import { useMutation,useQuery,useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { BodyAvatar } from "@/components/BodyAvatar";
import { createCheckIn,getCheckIns } from "@/services/checkInService";
import type { CheckIn, PainFrequency } from "@/types";
import { regionLabel, type RegionKey } from "@/lib/body-regions";

export const Route=createFileRoute("/track")({component:Track});
function Track(){
  const qc=useQueryClient();
  const q=useQuery({queryKey:["checkins"],queryFn:getCheckIns});
  const [pain,setPain]=useState(5);const [areas,setAreas]=useState<RegionKey[]>([]);
  const [frequency,setFrequency]=useState<PainFrequency>("on_and_off");const [mood,setMood]=useState(3);const [sleep,setSleep]=useState(3);const [comfort,setComfort]=useState(3);const [activity,setActivity]=useState(3);const [notes,setNotes]=useState("");
  const save=useMutation({mutationFn:(input:Omit<CheckIn,"id"|"createdAt"|"userId">)=>createCheckIn(input),onSuccess:()=>{qc.invalidateQueries({queryKey:["checkins"]});setNotes("");}});
  return <div><p className="text-sm font-semibold text-teal">Daily check-in</p><h1 className="mb-5 font-display text-3xl font-bold text-deep">How are you feeling?</h1>
    {q.isLoading?<p className="card text-muted-foreground">Loading check-ins…</p>:q.isError?<p role="alert" className="card text-destructive">Couldn't load check-ins.</p>:<div className="grid gap-5 lg:grid-cols-2">
      <section className="card"><label className="font-semibold">Pain level: {pain}/10</label><input className="mt-4 w-full" type="range" min={0} max={10} value={pain} onChange={(e)=>setPain(+e.target.value)}/>
      <p className="mt-5 mb-2 font-semibold">Pain locations</p>
      <BodyAvatar selected={areas} intensity={Object.fromEntries(areas.map((key)=>[key,pain]))} onToggle={(key)=>setAreas((old)=>old.includes(key)?old.filter((item)=>item!==key):[...old,key])}/>
      <div className="mt-2 flex flex-wrap gap-2">{areas.map((area)=><span key={area} className="chip chip-on">{regionLabel(area)}</span>)}</div></section>
      <section className="card space-y-4"><label className="block text-sm font-medium">Frequency<select className="mt-1 w-full rounded-xl border px-3 py-2" value={frequency} onChange={(e)=>setFrequency(e.target.value as PainFrequency)}><option value="once">Once</option><option value="on_and_off">On and off</option><option value="constant">Constant</option></select></label>
      {[["Mood",mood,setMood],["Sleep quality",sleep,setSleep],["Comfort",comfort,setComfort],["Activity",activity,setActivity]].map(([label,value,setter])=>{const setValue=setter as (value:number)=>void;return <label key={String(label)} className="block text-sm font-medium">{String(label)}: {String(value)}/5<input className="w-full" type="range" min={1} max={5} value={Number(value)} onChange={(e)=>setValue(+e.target.value)}/></label>})}
      <label className="block text-sm font-medium">Notes<textarea className="mt-1 w-full rounded-xl border px-3 py-2" rows={3} value={notes} onChange={(e)=>setNotes(e.target.value)}/></label>
      {save.isError&&<p role="alert" className="text-sm text-destructive">Couldn't save this check-in.</p>}<button className="btn-primary w-full" disabled={save.isPending||areas.length===0} onClick={()=>save.mutate({date:new Date().toISOString().slice(0,10),painLevel:pain,bodyAreas:areas,frequency,mood,sleepQuality:sleep,comfort,activity,notes})}>{save.isPending?"Saving…":"Save check-in"}</button></section>
    </div>}
  </div>;
}
