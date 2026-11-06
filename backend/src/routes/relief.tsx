import { createFileRoute } from "@tanstack/react-router";
import { useMutation,useQuery } from "@tanstack/react-query";
import { useEffect,useState } from "react";
import { Flame,Waves,Sun,Play,Square } from "lucide-react";
import { getMyDevices,logSession } from "@/services/deviceService";
import { getRoutines } from "@/services/routineService";
import { maxDurationFor, SAFETY_NOTICE } from "@/lib/device-safety";

export const Route=createFileRoute("/relief")({component:Relief});
function Relief(){
  const devices=useQuery({queryKey:["my-devices"],queryFn:getMyDevices});
  const routines=useQuery({queryKey:["routines"],queryFn:getRoutines});
  const [routineId,setRoutineId]=useState("routine-1");const [heat,setHeat]=useState(2);const [vibration,setVibration]=useState(2);const [redLight,setRedLight]=useState(1);const [duration,setDuration]=useState(15);const [running,setRunning]=useState(false);const [seconds,setSeconds]=useState(duration*60);
  useEffect(()=>{if(!running)return;const timer=setInterval(()=>setSeconds((value)=>{if(value<=1){setRunning(false);return 0}return value-1}),1000);return()=>clearInterval(timer)},[running]);
  const log=useMutation({mutationFn:()=>logSession({deviceId:devices.data?.[0]?.id??"device-1",routineId,startedAt:new Date().toISOString(),heat,vibration,redLight,durationMin:duration,actualMin:Math.max(1,Math.round((duration*60-seconds)/60)),painBefore:null,painAfter:null})});
  const choose=(id:string)=>{const routine=routines.data?.find((item)=>item.id===id);if(routine){setRoutineId(id);setHeat(routine.heat);setVibration(routine.vibration);setRedLight(routine.redLight);setDuration(routine.durationMin);setSeconds(routine.durationMin*60);}};
  if(devices.isLoading||routines.isLoading)return <p className="card text-muted-foreground">Loading your device…</p>;
  if(devices.isError||routines.isError)return <p role="alert" className="card text-destructive">Couldn't load device controls.</p>;
  if(!devices.data?.length)return <section className="card"><h1 className="text-xl font-bold text-deep">Add your device</h1><p className="mt-2 text-sm text-muted-foreground">Enter a serial number to pair your wearable.</p></section>;
  const max=maxDurationFor(heat);
  return <div><p className="text-sm font-semibold text-teal">My Device</p><h1 className="mb-5 text-3xl font-bold text-deep">Therapy controls</h1>
  <div className="grid gap-5 lg:grid-cols-2"><section className="card"><h2 className="font-semibold text-deep">Preset routine</h2><div className="mt-3 grid gap-2">{routines.data?.filter((item)=>item.isPreset).map((item)=><button key={item.id} onClick={()=>choose(item.id)} className={`rounded-xl border p-3 text-left ${routineId===item.id?"border-primary bg-secondary":"bg-white"}`}><span className="block font-semibold text-deep">{item.name}</span><span className="text-xs text-muted-foreground">{item.description}</span></button>)}</div></section>
  <section className="card"><h2 className="font-semibold text-deep">Intensity levels</h2><div className="mt-4 space-y-5">{[
    ["Heat",heat,setHeat,Flame],["Vibration",vibration,setVibration,Waves],["Red light",redLight,setRedLight,Sun],
  ].map(([label,value,setter,Icon])=>{const IconType=Icon as typeof Flame;const setValue=setter as (n:number)=>void;return <label key={String(label)} className="block"><span className="flex items-center gap-2 text-sm font-medium"><IconType className="h-4 w-4 text-teal"/>{String(label)}: {Number(value)}/5</span><input className="mt-2 w-full" type="range" min={0} max={5} value={Number(value)} onChange={(e)=>{const next=+e.target.value;if(label==="Heat"){const allowed=Math.min(next,max);setValue(allowed)}else setValue(next)}}/></label>})}</div>
  <label className="mt-5 block text-sm font-medium">Session duration: {duration} min<input className="mt-2 w-full" type="range" min={5} max={Math.min(30,max)} step={5} value={duration} onChange={(e)=>{const next=+e.target.value;setDuration(next);setSeconds(next*60)}}/></label>
  <p className="mt-3 rounded-xl bg-muted px-3 py-2 text-xs text-muted-foreground">{SAFETY_NOTICE}</p></section></div>
  <section className="mt-4 card flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs text-muted-foreground">Session timer</p><p className="font-display text-4xl font-bold text-deep">{String(Math.floor(seconds/60)).padStart(2,"0")}:{String(seconds%60).padStart(2,"0")}</p></div><div className="flex gap-2">{running?<button className="btn-secondary" onClick={()=>setRunning(false)}><Square className="h-4 w-4"/>Stop</button>:<button className="btn-primary" onClick={()=>{setSeconds(duration*60);setRunning(true)}}><Play className="h-4 w-4"/>Start</button>}<button className="btn-secondary" disabled={running||log.isPending} onClick={()=>log.mutate()}>Log session</button></div></section>
  {log.isSuccess&&<p className="mt-3 rounded-xl bg-secondary px-3 py-2 text-sm text-primary">Session logged.</p>}
  </div>
}
