import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Printer } from "lucide-react";
import { getPatientDetail } from "@/services/patientService";
import { getPatientNotes, addPatientNote } from "@/services/noteService";
import { assignRoutine } from "@/services/routineService";
import { sendPatientNudge, scheduleFollowUp } from "@/services/patientService";
import { ProfessionalPageShell } from "./ProfessionalShell";
import { PainChart } from "@/components/PainChart";

const tabs = ["Overview","Check-ins","Sessions","Notes","Care Plan","Access"] as const;

export function ProfessionalPatient({ patientId }: { patientId:string }) {
  const [tab,setTab] = useState<(typeof tabs)[number]>("Overview");
  const [note,setNote] = useState("");
  const [nudge,setNudge] = useState("");
  const [followUpDate,setFollowUpDate] = useState("");
  const [followUpReason,setFollowUpReason] = useState("");
  const qc = useQueryClient();
  const patient = useQuery({ queryKey:["professional-patient",patientId],queryFn:()=>getPatientDetail(patientId) });
  const notes = useQuery({ queryKey:["professional-notes",patientId],queryFn:()=>getPatientNotes(patientId),enabled:tab==="Notes" });
  const [routineId,setRoutineId] = useState("routine-1");
  const addNote = useMutation({mutationFn:(body:string)=>addPatientNote(patientId,body),onSuccess:()=>{setNote("");qc.invalidateQueries({queryKey:["professional-notes",patientId]});}});
  const sendNudge = useMutation({mutationFn:(message:string)=>sendPatientNudge(patientId,message),onSuccess:()=>setNudge("")});
  const assign = useMutation({mutationFn:()=>assignRoutine({patientId,routineId,heat:2,vibration:2,redLight:1,durationMin:15,timesPerWeek:4,instructions:"Use gently after your daily check-in."}),onSuccess:()=>qc.invalidateQueries({queryKey:["professional-patient",patientId]})});
  const followUp = useMutation({mutationFn:()=>scheduleFollowUp(patientId,patient.data?.patient.name??"Patient",followUpDate,followUpReason||"Review progress"),onSuccess:()=>{setFollowUpDate("");setFollowUpReason("");}});

  const detail = patient.data;
  const chart = (detail?.checkIns ?? []).slice(0,7).reverse().map((item)=>({day:item.date.slice(5),pain:item.painLevel,sleep:item.sleepQuality}));

  return (
    <ProfessionalPageShell title={detail?.patient.name ?? "Patient"} sub="Shared patient information and care actions.">
      <Link to="/professional/patients" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary"><ArrowLeft className="h-4 w-4"/>All patients</Link>
      {patient.isLoading && <p className="card text-muted-foreground">Loading patient…</p>}
      {patient.isError && <p role="alert" className="card text-destructive">Patient data could not be loaded.</p>}
      {!patient.isLoading && !patient.isError && detail && (
        <>
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {tabs.map((item)=><button key={item} className={`chip whitespace-nowrap ${tab===item?"chip-on":""}`} onClick={()=>setTab(item)}>{item}</button>)}
          </div>
          {detail.link.status !== "active" ? (
            <section className="card text-sm text-muted-foreground">This patient's access link is no longer active. Shared clinical data is hidden.</section>
          ) : (
            <>
              {tab==="Overview" && <div className="grid gap-4 sm:grid-cols-2"><section className="card"><p className="text-xs text-muted-foreground">7-day average</p><p className="mt-1 text-3xl font-bold text-deep">{detail.avgPain7d ?? "—"}<span className="text-base">/10</span></p></section><section className="card"><p className="text-xs text-muted-foreground">Status</p><p className="mt-1 text-xl font-bold capitalize text-deep">{detail.flag.replace("_"," ")}</p></section><section className="card sm:col-span-2"><h3 className="mb-3 font-semibold text-deep">Pain trend</h3>{chart.length?<PainChart data={chart}/>:<p className="text-sm text-muted-foreground">Pain history is not shared.</p>}</section></div>}
              {tab==="Check-ins" && <section className="card">{detail.checkIns ? detail.checkIns.map((item)=><div key={item.id} className="border-b py-3 last:border-0"><div className="flex justify-between"><strong className="text-deep">{item.painLevel}/10</strong><span className="text-xs text-muted-foreground">{item.date}</span></div><p className="mt-1 text-sm text-muted-foreground">{item.notes||"No notes"}</p></div>) : <p className="text-sm text-muted-foreground">Pain history has not been shared by this patient.</p>}</section>}
              {tab==="Sessions" && <section className="card">{detail.sessions ? detail.sessions.map((item)=><div key={item.id} className="border-b py-3 last:border-0"><p className="font-medium text-deep">{item.actualMin} minutes</p><p className="text-sm text-muted-foreground">Pain {item.painBefore} → {item.painAfter}/10 · {item.actualMin} min</p></div>) : <p className="text-sm text-muted-foreground">Device sessions have not been shared.</p>}</section>}
              {tab==="Notes" && <section className="card space-y-4"><div>{notes.isLoading?<p className="text-muted-foreground">Loading notes…</p>:notes.isError?<p className="text-destructive">Notes could not be loaded.</p>:notes.data?.map((item)=><div key={item.id} className="border-b py-3 last:border-0"><p className="text-sm">{item.body}</p><p className="mt-1 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p></div>)}{notes.data?.length===0&&<p className="text-sm text-muted-foreground">No notes yet.</p>}</div><textarea className="w-full rounded-xl border px-3 py-2 text-sm" rows={3} placeholder="Write a private clinical note" value={note} onChange={(event)=>setNote(event.target.value)}/><button className="btn-primary" disabled={!note.trim()||addNote.isPending} onClick={()=>addNote.mutate(note)}>Add note</button></section>}
              {tab==="Care Plan" && <section className="card grid gap-4"><div><label className="text-sm font-medium">Recommend a routine<select className="mt-1 w-full rounded-xl border px-3 py-2" value={routineId} onChange={(event)=>setRoutineId(event.target.value)}><option value="routine-1">Gentle Relief</option><option value="routine-2">Deep Relief</option><option value="routine-3">Evening Wind-down</option></select></label><p className="mt-3 text-xs text-muted-foreground">Safe starting settings: heat 2, vibration 2, red light 1, duration 15 minutes.</p></div><button className="btn-primary" disabled={assign.isPending} onClick={()=>assign.mutate()}>{assign.isPending?"Assigning…":"Assign routine"}</button><div className="border-t pt-4"><label className="text-sm font-medium">Send a short nudge<textarea className="mt-1 w-full rounded-xl border px-3 py-2" rows={2} value={nudge} onChange={(event)=>setNudge(event.target.value)}/></label><button className="btn-primary mt-2" disabled={!nudge.trim()||sendNudge.isPending} onClick={()=>sendNudge.mutate(nudge)}>Send nudge</button></div><div className="border-t pt-4"><p className="mb-2 font-medium text-deep">Set a follow-up</p><div className="grid gap-2 sm:grid-cols-2"><input type="datetime-local" className="rounded-xl border px-3 py-2 text-sm" value={followUpDate} onChange={(event)=>setFollowUpDate(event.target.value)}/><input className="rounded-xl border px-3 py-2 text-sm" placeholder="Reason" value={followUpReason} onChange={(event)=>setFollowUpReason(event.target.value)}/></div><button className="btn-primary mt-2" disabled={!followUpDate||followUp.isPending} onClick={()=>followUp.mutate()}>Schedule</button></div></section>}
              {tab==="Access" && <section className="card"><p className="font-medium text-deep">Shared categories</p><ul className="mt-3 space-y-2 text-sm text-muted-foreground"><li>Pain history: <strong>{detail.link.permissions.painHistory?"Allowed":"Hidden"}</strong></li><li>Device sessions: <strong>{detail.link.permissions.deviceSessions?"Allowed":"Hidden"}</strong></li><li>Clinical notes: <strong>{detail.link.permissions.notes?"Allowed":"Hidden"}</strong></li></ul></section>}
            </>
          )}
          <button className="btn-secondary mt-4 inline-flex items-center gap-2" onClick={()=>window.print()}><Printer className="h-4 w-4"/>Print summary</button>
        </>
      )}
    </ProfessionalPageShell>
  );
}
