import { useState } from "react";

export function Combobox({ label, value, options, onChange, placeholder, disabled }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void; placeholder?: string; disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const list = options.filter((o) => o.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        disabled={disabled}
        value={open ? q : value}
        placeholder={placeholder}
        onFocus={() => { setQ(""); setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onChange={(e) => setQ(e.target.value)}
        className="w-full rounded-xl border bg-card px-3 py-2 text-sm disabled:opacity-50"
        role="combobox" aria-expanded={open}
      />
      {open && (
        <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-xl border bg-card shadow-float" role="listbox">
          {value && <li><button type="button" onMouseDown={() => onChange("")} className="w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted">Clear</button></li>}
          {list.map((o) => (
            <li key={o}><button type="button" onMouseDown={() => { onChange(o); setOpen(false); }} className={`w-full px-3 py-2 text-left text-sm hover:bg-muted ${o === value ? "font-semibold text-primary" : ""}`}>{o}</button></li>
          ))}
          {list.length === 0 && <li className="px-3 py-2 text-sm text-muted-foreground">No matches</li>}
        </ul>
      )}
    </div>
  );
}
