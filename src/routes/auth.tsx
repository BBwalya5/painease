import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Activity, ArrowRight, LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { login, loginWithGoogle, register } from "@/services/authService";
import type { Role } from "@/types";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

const accounts: Record<Role, { email:string; password:string }> = {
  user:{email:"user@painease.test",password:"User123"},
  professional:{email:"professional@painease.test",password:"Professional123"},
  admin:{email:"admin@painease.test",password:"Admin123"},
};

function AuthPage() {
  const navigate = useNavigate();
  const [role,setRole]=useState<Role>("user");
  const [mode,setMode]=useState<"in"|"up">("in");
  const [name,setName]=useState("");
  const [email,setEmail]=useState(accounts.user.email);
  const [password,setPassword]=useState(accounts.user.password);
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  const [googleBusy,setGoogleBusy]=useState(false);

  const choose=(next:Role)=>{
    setRole(next);setEmail(accounts[next].email);setPassword(accounts[next].password);setError("");
  };
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();setBusy(true);setError("");
    try{
      const session=mode==="up"?await register({name,email,role:"user"}):await login(email,password,role);
      const target=session.user.role==="admin"?"/admin":session.user.role==="professional"?"/professional":"/track";
      await navigate({to:target,replace:true});
    }catch(err){setError(err instanceof Error?err.message:"Sign-in failed");}finally{setBusy(false);}
  };
  const joinWithGoogle=async()=>{
    setGoogleBusy(true);
    setError("");
    try{
      const session=await loginWithGoogle();
      const target=session.user.role==="admin"?"/admin":session.user.role==="professional"?"/professional":"/track";
      await navigate({to:target,replace:true});
    }catch(err){setError(err instanceof Error?err.message:"Google sign-in failed");}finally{setGoogleBusy(false);}
  };
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-soft px-4 py-8 sm:px-6">
      <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-float backdrop-blur md:grid-cols-[0.9fr_1.1fr]">
        <section className="bg-hero hidden min-h-[640px] flex-col justify-between p-10 text-white md:flex">
          <div>
            <img src="/painease-logo.png" alt="PainEase" className="h-12 w-auto max-w-[190px] rounded-lg bg-white px-3 py-2 object-contain" />
            <p className="mt-12 max-w-sm text-4xl font-bold leading-tight">
              Understand your pain. Find your ease.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/75">
              Track patterns, discover guidance, and connect with the right support when you need it.
            </p>
          </div>

          <div className="grid gap-3">
            {[
              { Icon: Activity, text: "Personal pain tracking" },
              { Icon: ShieldCheck, text: "Private and secure" },
              { Icon: UserRound, text: "Support when you need it" },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm">
                <Icon className="h-5 w-5 text-white/90" />
                <span>{String(text)}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex min-h-[620px] items-center px-6 py-10 sm:px-10 md:px-12">
          <div className="w-full max-w-md mx-auto">
            <img src="/painease-logo.png" alt="PainEase" className="mx-auto mb-6 h-12 w-auto max-w-[190px] object-contain md:hidden" />
            <div className="mb-7">
              {mode==="up"&&<p className="mb-2 text-sm font-semibold text-teal">Join PainEase</p>}
              <h1 className="font-display text-3xl font-bold text-deep">{mode==="in"?"Welcome back":"Create your account"}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{mode==="in"?"Sign in to continue your wellness journey.":"Start tracking and understanding your pain."}</p>
            </div>
        {mode==="in"&&<>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Choose a preview module</p>
          <div className="mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-soft p-1.5">
            {(["user","professional","admin"] as Role[]).map((item)=><button key={item} type="button" onClick={()=>choose(item)} className={`rounded-xl px-2 py-2.5 text-sm font-semibold capitalize transition ${role===item?"bg-white text-primary shadow-soft":"text-muted-foreground hover:text-deep"}`}>{item}</button>)}
          </div>
        </>}
        <button
          type="button"
          onClick={joinWithGoogle}
          disabled={googleBusy||busy}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-deep shadow-soft transition hover:border-primary/30 hover:bg-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
            <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.89-1.74 2.98-4.31 2.98-7.42z"/>
            <path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.63-2.35l-3.24-2.55c-.9.6-2.05.96-3.39.96-2.61 0-4.83-1.76-5.62-4.13H3.04v2.63A10 10 0 0 0 12 22z"/>
            <path fill="#FBBC05" d="M6.38 13.93A6 6 0 0 1 6.06 12c0-.67.12-1.32.32-1.93V7.44H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.56l3.34-2.63z"/>
            <path fill="#EA4335" d="M12 5.94c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.96 5.44l3.34 2.63C7.17 7.7 9.39 5.94 12 5.94z"/>
          </svg>
          {googleBusy?(mode==="in"?"Signing in...":"Joining..."):mode==="in"?"Continue with Google":"Join with Google"}
        </button>
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs font-medium text-muted-foreground">or use email</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <form onSubmit={submit} className="space-y-4">
          {mode==="up"&&<label className="block text-sm font-medium text-deep">Full name<div className="relative mt-1.5"><UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input className="w-full rounded-xl border bg-white py-3 pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)} required/></div></label>}
          <label className="block text-sm font-medium text-deep">Email address<div className="relative mt-1.5"><Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input className="w-full rounded-xl border bg-white py-3 pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" type="email" placeholder="you@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required/></div></label>
          <label className="block text-sm font-medium text-deep">Password<div className="relative mt-1.5"><LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><input className="w-full rounded-xl border bg-white py-3 pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10" type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/></div></label>
          {error&&<p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2.5 text-sm text-destructive">{error}</p>}
          <button className="btn-primary w-full" disabled={busy}>{busy?"Please wait…":mode==="in"?"Sign in":"Create account"}<ArrowRight className="h-4 w-4"/></button>
        </form>
        <div className="mt-6 text-center">
          <button className="text-sm font-semibold text-primary hover:underline" onClick={()=>{setMode(mode==="in"?"up":"in");setError("");}}>{mode==="in"?"Create an account":"Back to sign in"}</button>
        </div>
          </div>
        </div>
      </div>
    </main>
  );
}
