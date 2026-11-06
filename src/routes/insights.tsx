import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PainChart } from "@/components/PainChart";
import { getCheckIns } from "@/services/checkInService";
import { getMySessions } from "@/services/deviceService";
import { getAssignedRoutines,getRoutines } from "@/services/routineService";
export const Route=createFileRoute("/insights")({component:Insights});
function Insights(){
  const checkIns=useQuery({queryKey:["insights-checkins"],queryFn:getCheckIns});
  const sessions=useQuery({queryKey:["insights-sessions"],queryFn:getMySessions});
  const routines=useQuery({queryKey:["insights-routines"],queryFn:getRoutines});
  const assigned=useQuery({queryKey:["assigned-routines"],queryFn:getAssignedRoutines});
  if(checkIns.isLoading||sessions.isLoading)return <p className="card text-muted-foreground">Loading insights…</p>;
  if(checkIns.isError||sessions.isError)return <p role="alert" className="card text-destructive">We couldn't load insights.</p>;
  const chart=(checkIns.data??[]).slice(0,14).reverse().map((item)=>({day:item.date.slice(5),pain:item.painLevel,sleep:item.sleepQuality}));
  const areas=(checkIns.data??[]).flatMap((item)=>item.bodyAreas).reduce<Record<string,number>>((acc,item)=>{acc[item]=(acc[item]??0)+1;return acc},{});
  const drops=(sessions.data??[]).filter((item)=>item.painAfter!==null&&item.painBefore!==null).map((item)=>({name:routines.data?.find((r)=>r.id===item.routineId)?.name??"Custom session",drop:(item.painBefore??0)-(item.painAfter??0)}));
  return <div><p className="text-sm font-semibold text-teal">Ease Insights</p><h1 className="mb-5 text-3xl font-bold text-deep">Your pain patterns</h1>
  <section className="card"><h2 className="mb-3 font-semibold text-deep">Pain over time</h2><PainChart data={chart}/></section>
  <div className="mt-4 grid gap-4 sm:grid-cols-2"><section className="card"><h2 className="font-semibold text-deep">Pain by body area</h2>{Object.entries(areas).length?Object.entries(areas).map(([area,count])=><div key={area} className="mt-3 flex justify-between text-sm"><span className="capitalize">{area.replaceAll("-"," ")}</span><span className="font-bold text-primary">{count}</span></div>):<p className="mt-2 text-sm text-muted-foreground">No area data yet.</p>}</section>
  <section className="card"><h2 className="font-semibold text-deep">Routines that helped most</h2>{drops.length?drops.slice(0,4).map((item)=><div key={`${item.name}-${item.drop}`} className="mt-3 flex justify-between text-sm"><span>{item.name}</span><span className="font-bold text-teal">{item.drop} point drop</span></div>):<p className="mt-2 text-sm text-muted-foreground">Complete a session to compare results.</p>}</section></div>
  <section className="mt-4 card"><h2 className="font-semibold text-deep">Assigned routines</h2>{assigned.isLoading?<p>Loading…</p>:assigned.data?.length?assigned.data.map((item)=><p key={item.id} className="mt-2 text-sm">{item.timesPerWeek} times/week · {item.instructions}</p>):<p className="mt-2 text-sm text-muted-foreground">No routines assigned yet.</p>}</section></div>
}
