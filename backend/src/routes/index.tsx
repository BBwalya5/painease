import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Activity, Clock3, Flame, HeartPulse } from "lucide-react";
import { getCheckIns } from "@/services/checkInService";
import { getMySessions } from "@/services/deviceService";
import { getProfile } from "@/services/profileService";
import { PainChart } from "@/components/PainChart";

export const Route=createFileRoute("/")({component:Home});

function Home(){
  const profile=useQuery({queryKey:["profile"],queryFn:getProfile});
  const checkIns=useQuery({queryKey:["checkins-dashboard"],queryFn:getCheckIns});
  const sessions=useQuery({queryKey:["sessions-dashboard"],queryFn:getMySessions});
  const latest=checkIns.data?.[0];
  const lastSession=sessions.data?.[0];
  const chart=(checkIns.data??[]).slice(0,7).reverse().map((item)=>({day:item.date.slice(5),pain:item.painLevel,sleep:item.sleepQuality}));
  if(profile.isLoading||checkIns.isLoading||sessions.isLoading)return <p className="py-10 text-center text-muted-foreground">Loading your dashboard…</p>;
  if(profile.isError||checkIns.isError||sessions.isError)return <p role="alert" className="card text-destructive">We couldn't load your dashboard. Please try again.</p>;
  return <div className="space-y-5">
    <section className="rounded-3xl bg-hero p-6 text-deep-foreground shadow-float">
      <p className="text-sm opacity-80">Thursday, November 5</p><h1 className="mt-1 text-3xl font-bold">Good morning, {profile.data?.name}</h1>
      <Link to="/track" className="mt-5 inline-flex rounded-xl bg-card px-4 py-3 font-semibold text-primary"><HeartPulse className="mr-2 h-5 w-5"/>{latest?"Complete today's check-in":"Start a check-in"}</Link>
    </section>
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="card"><p className="text-xs text-muted-foreground">Today's prompt</p><p className="mt-1 text-2xl font-bold text-deep">{latest?`${latest.painLevel}/10`:"Not logged"}</p></div>
      <div className="card"><p className="text-xs text-muted-foreground">Last session</p><p className="mt-1 font-semibold text-deep">{lastSession?`${lastSession.actualMin} min`:"No sessions yet"}</p></div>
      <Link to="/relief" className="card bg-secondary"><p className="text-xs text-primary">Device</p><p className="mt-1 flex items-center gap-2 font-semibold text-deep"><Flame className="h-5 w-5 text-teal"/>Open controls</p></Link>
    </div>
    <section className="card"><div className="flex items-center justify-between"><h2 className="font-semibold text-deep">7-day pain trend</h2><Activity className="h-5 w-5 text-teal"/></div><PainChart data={chart}/></section>
    {lastSession&&<section className="card"><div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock3 className="h-4 w-4"/><span>Last therapy: pain {lastSession.painBefore} → {lastSession.painAfter}/10</span></div></section>}
  </div>
}
