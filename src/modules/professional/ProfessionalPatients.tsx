import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import { getPatients } from "@/services/patientService";
import { ProfessionalPageShell } from "./ProfessionalShell";

const labels = {
  improving: "Improving",
  stable: "Stable",
  pain_rising: "Pain rising",
  inactive: "Inactive",
};

export function ProfessionalPatients() {
  const [search, setSearch] = useState("");
  const patients = useQuery({ queryKey: ["professional-patients"], queryFn: getPatients });
  const visible = (patients.data ?? []).filter((item) => {
    if (item.link.status !== "active") return false;
    const term = search.toLowerCase().trim();
    return !term || item.patient.name.toLowerCase().includes(term) || item.patient.email.toLowerCase().includes(term);
  });

  return (
    <ProfessionalPageShell title="Patients" sub="Patients appear here only after they accept your link request.">
      <div className="mb-4 flex items-center gap-2 rounded-xl border bg-card px-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input className="w-full bg-transparent py-3 text-sm outline-none" placeholder="Search patient" value={search} onChange={(event) => setSearch(event.target.value)} />
      </div>
      {patients.isLoading && <p className="card text-muted-foreground">Loading patients…</p>}
      {patients.isError && <p role="alert" className="card text-destructive">Patients could not be loaded.</p>}
      {!patients.isLoading && !patients.isError && (
        <div className="grid gap-3">
          {visible.map((item) => (
            <Link key={item.patient.id} to="/professional/patients/$patientId" params={{ patientId: item.patient.id }} className="card flex items-center justify-between gap-4 hover:border-primary/30">
              <div>
                <p className="font-semibold text-deep">{item.patient.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{item.patient.painType} · Avg. 7-day pain {item.avgPain7d ?? "—"}/10</p>
              </div>
              <span className={`chip whitespace-nowrap ${item.flag === "pain_rising" ? "bg-destructive/10 text-destructive" : item.flag === "improving" ? "chip-on" : ""}`}>{labels[item.flag]}</span>
            </Link>
          ))}
          {visible.length === 0 && <div className="card text-center text-sm text-muted-foreground">No accepted patients match this search.</div>}
        </div>
      )}
    </ProfessionalPageShell>
  );
}
