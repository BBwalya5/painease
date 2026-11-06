import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zambiaDistricts, zambiaProvinces } from "@/lib/zambia";
import { ProfessionalPageShell, useMyProProfile } from "./ProfessionalShell";
import { registerProfessional } from "@/services/practitionerService";

const professions = ["Nurse", "Midwife", "Clinical officer", "Medical doctor", "Physiotherapist", "Pharmacist", "Other"];
const serviceList = ["Women's health", "Menstrual health", "Physiotherapy", "Chronic condition support", "Family planning", "Counselling", "General consultation"];

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(120),
  profession: z.string().min(1, "Choose your profession"),
  license_number: z.string().trim().min(3, "Enter your licence or registration number").max(60),
  licensing_body: z.string().trim().max(120),
  facility: z.string().trim().max(160),
  bio: z.string().trim().max(800),
});

type Form = { full_name: string; profession: string; license_number: string; licensing_body: string; facility: string; province: string; district: string; services: string[]; bio: string };
const empty: Form = { full_name: "", profession: "", license_number: "", licensing_body: "", facility: "", province: "", district: "", services: [], bio: "" };

export function ProfessionalProfile() {
  const qc = useQueryClient();
  const app = useMyProProfile();
  const [f, setF] = useState<Form | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (app.isSuccess && !f) {
      const d = app.data;
      setF(d ? { full_name: d.full_name, profession: d.profession, license_number: d.license_number, licensing_body: d.licensing_body ?? "", facility: d.facility ?? "", province: d.province ?? "", district: d.district ?? "", services: d.services, bio: d.bio ?? "" } : empty);
    }
  }, [app.isSuccess, app.data, f]);

  const save = useMutation({
    mutationFn: async () => {
      const parsed = schema.safeParse(f);
      if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check the form");
      await registerProfessional({ name:f!.full_name, profession:f!.profession, licenseNumber:f!.license_number, clinic:f!.facility });
    },
    onSuccess: () => { setMsg("Saved."); qc.invalidateQueries({ queryKey: ["my-pro"] }); qc.invalidateQueries({ queryKey: ["my-roles"] }); },
  });

  const input = "w-full rounded-xl border bg-card px-3 py-2 text-sm";
  const set = (p: Partial<Form>) => { if (f) { setF({ ...f, ...p }); setMsg(""); } };

  return (
    <ProfessionalPageShell title="My profile" sub="Your licence details and the services you offer.">
      {!f ? <p className="text-muted-foreground">Loading…</p> : (
        <section className="card grid gap-3 sm:grid-cols-2">
          <label className="text-sm">Full name<input className={input} value={f.full_name} maxLength={120} onChange={(e) => set({ full_name: e.target.value })} /></label>
          <label className="text-sm">Profession<select className={input} value={f.profession} onChange={(e) => set({ profession: e.target.value })}><option value="">Choose…</option>{professions.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label className="text-sm">Licence / registration number<input className={input} value={f.license_number} maxLength={60} onChange={(e) => set({ license_number: e.target.value })} /></label>
          <label className="text-sm">Licensing body<input className={input} placeholder="e.g. Health Professions Council of Zambia" value={f.licensing_body} maxLength={120} onChange={(e) => set({ licensing_body: e.target.value })} /></label>
          <label className="text-sm">Facility where you work<input className={input} value={f.facility} maxLength={160} onChange={(e) => set({ facility: e.target.value })} /></label>
          <label className="text-sm">Province<select className={input} value={f.province} onChange={(e) => set({ province: e.target.value, district: "" })}><option value="">Choose…</option>{zambiaProvinces.map((p) => <option key={p}>{p}</option>)}</select></label>
          <label className="text-sm">District<select className={input} value={f.district} disabled={!f.province} onChange={(e) => set({ district: e.target.value })}><option value="">Choose…</option>{(zambiaDistricts[f.province] ?? []).map((d) => <option key={d}>{d}</option>)}</select></label>
          <div className="sm:col-span-2 text-sm">
            <p className="mb-2">Services you offer</p>
            <div className="flex flex-wrap gap-2">{serviceList.map((s) => { const on = f.services.includes(s); return <button key={s} type="button" className={`chip ${on ? "chip-on" : ""}`} onClick={() => set({ services: on ? f.services.filter((x) => x !== s) : [...f.services, s] })}>{s}</button>; })}</div>
          </div>
          <label className="text-sm sm:col-span-2">Short introduction<textarea className={input} rows={3} maxLength={800} value={f.bio} onChange={(e) => set({ bio: e.target.value })} /></label>
          {save.isError && <p role="alert" className="sm:col-span-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{save.error instanceof Error ? save.error.message : "Couldn't save"}</p>}
          {msg && <p className="sm:col-span-2 text-sm text-teal">{msg}</p>}
          <div className="sm:col-span-2"><button className="btn-primary" disabled={save.isPending} onClick={() => save.mutate()}>{app.data ? "Save changes" : "Submit application"}</button></div>
        </section>
      )}
    </ProfessionalPageShell>
  );
}
