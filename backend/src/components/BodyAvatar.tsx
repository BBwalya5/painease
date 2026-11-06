import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { allRegionKeys, fillerShapes, regionLabel, regionsForView, type RegionKey, type View } from "@/lib/body-regions";
import { painColor } from "@/lib/sample-data";

type Props = {
  selected: RegionKey[];
  intensity?: Record<RegionKey, number>;
  onToggle: (key: RegionKey) => void;
};

export function BodyAvatar({ selected, intensity = {}, onToggle }: Props) {
  const [view, setView] = useState<View>("front");
  const [mode, setMode] = useState<"map" | "list">("map");
  const [q, setQ] = useState("");
  const regions = useMemo(() => regionsForView(view), [view]);
  const filtered = allRegionKeys.filter((k) => regionLabel(k).toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1 rounded-full bg-muted p-1" role="tablist" aria-label="Body view">
          {(["front", "back"] as const).map((v) => (
            <button key={v} type="button" role="tab" aria-selected={mode === "map" && view === v} onClick={() => { setMode("map"); setView(v); }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${mode === "map" && view === v ? "bg-card text-primary shadow-soft" : "text-muted-foreground"}`}>{v}</button>
          ))}
          <button type="button" role="tab" aria-selected={mode === "list"} onClick={() => setMode("list")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium ${mode === "list" ? "bg-card text-primary shadow-soft" : "text-muted-foreground"}`}>List</button>
        </div>
        <span className="text-xs text-muted-foreground">{selected.length} selected</span>
      </div>

      {mode === "map" ? (
        <div className="relative mt-3">
          <svg viewBox="0 0 120 225" className="mx-auto h-80 w-auto" aria-label={`Body ${view} view`}>
            <defs>
              <linearGradient id={`body-surface-${view}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--secondary)" />
                <stop offset="100%" stopColor="var(--muted)" />
              </linearGradient>
            </defs>
            <g fill={`url(#body-surface-${view})`} stroke="var(--sky)" strokeWidth="0.7" className="pointer-events-none">
              <ellipse cx="60" cy={view === "front" ? 18 : 20} rx="12" ry={view === "front" ? 14 : 16} />
              <path d="M54 31 Q60 35 66 31 L67 43 L53 43 Z" />
              <path d="M38 43 Q48 38 54 43 L66 43 Q72 38 82 43 L87 52 Q82 62 73 68 L47 68 Q38 62 33 52 Z" />
              <path d="M33 49 Q27 51 23 58 L18 92 Q17 102 24 104 Q29 103 31 94 L36 61 Q37 52 33 49Z" />
              <path d="M87 49 Q93 51 97 58 L102 92 Q103 102 96 104 Q91 103 89 94 L84 61 Q83 52 87 49Z" />
              <path d="M47 65 Q60 69 73 65 L72 96 Q60 103 48 96Z" />
              <path d="M48 96 Q60 101 72 96 L75 112 Q60 118 45 112Z" />
              <path d="M45 111 Q51 114 57 112 L54 149 Q51 156 44 153 Q40 146 42 125Z" />
              <path d="M63 112 Q69 114 75 111 L78 125 Q80 146 76 153 Q69 156 66 149Z" />
              <path d="M44 152 Q51 155 54 151 L53 194 Q51 201 45 199 Q42 194 43 160Z" />
              <path d="M66 151 Q69 155 76 152 L77 160 Q78 194 75 199 Q69 201 67 194Z" />
              <ellipse cx="50" cy="210" rx="9" ry="5" />
              <ellipse cx="70" cy="210" rx="9" ry="5" />
            </g>
            {view === "back" && (
              <g fill="none" stroke="var(--sky)" strokeWidth="0.55" className="pointer-events-none opacity-70">
                <path d="M60 43 Q58 75 60 112" />
                <path d="M60 112 Q57 130 60 151" />
              </g>
            )}
            {view === "front" && (
              <g fill="none" stroke="var(--sky)" strokeWidth="0.55" className="pointer-events-none opacity-70">
                <path d="M60 43 Q58 75 60 96" />
                <path d="M60 66 Q50 68 47 74" />
                <path d="M60 66 Q70 68 73 74" />
              </g>
            )}
            {fillerShapes.map((s, i) => s.kind === "rect" ? <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={3} fill="var(--muted)" /> : null)}
            {regions.map(({ key, shape }) => {
              const on = selected.includes(key);
              const fill = on ? painColor(intensity[key] ?? 5) : "var(--muted)";
              const common = {
                fill, stroke: on ? "var(--deep)" : "var(--border)", strokeWidth: on ? 1 : 0.6,
                className: "cursor-pointer transition-colors hover:opacity-80 focus:outline-none",
                role: "button", tabIndex: 0, "aria-pressed": on, "aria-label": regionLabel(key),
                onClick: () => onToggle(key),
                onKeyDown: (e: React.KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(key); } },
              };
              return shape.kind === "ellipse"
                ? <ellipse key={key} cx={shape.cx} cy={shape.cy} rx={shape.rx} ry={shape.ry} {...common}><title>{regionLabel(key)}</title></ellipse>
                : <rect key={key} x={shape.x} y={shape.y} width={shape.w} height={shape.h} rx={3} {...common}><title>{regionLabel(key)}</title></rect>;
            })}
          </svg>
          <div className="pointer-events-none absolute inset-x-0 top-1/2 flex justify-between px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{view === "front" ? "Right" : "Left"}</span><span>{view === "front" ? "Left" : "Right"}</span>
          </div>
        </div>
      ) : (
        <div className="mt-3">
          <label className="flex items-center gap-2 rounded-xl border bg-card px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search body areas" className="w-full bg-transparent text-sm outline-none" />
          </label>
          <div className="mt-2 max-h-72 overflow-y-auto rounded-xl border">
            {filtered.map((k) => (
              <label key={k} className="flex cursor-pointer items-center gap-3 border-b px-3 py-2 text-sm last:border-0">
                <input type="checkbox" checked={selected.includes(k)} onChange={() => onToggle(k)} />
                {regionLabel(k)}
              </label>
            ))}
            {filtered.length === 0 && <p className="p-3 text-sm text-muted-foreground">No matching areas.</p>}
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selected.map((k) => (
            <button key={k} type="button" onClick={() => onToggle(k)} className="chip chip-on" aria-label={`Remove ${regionLabel(k)}`}>
              {regionLabel(k)} <X className="h-3 w-3" />
            </button>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-muted-foreground">The map records where you feel pain. It doesn't diagnose a condition or organ.</p>
    </div>
  );
}
