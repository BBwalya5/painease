import type { BodyArea } from "@/lib/sample-data";

type Zone = { area: BodyArea; shape: "e" | "r"; x: number; y: number; w: number; h: number; back?: boolean };
const zones: Zone[] = [
  { area: "Head", shape: "e", x: 60, y: 22, w: 15, h: 18 },
  { area: "Neck", shape: "r", x: 53, y: 40, w: 14, h: 10 },
  { area: "Shoulders", shape: "r", x: 30, y: 50, w: 60, h: 12 },
  { area: "Chest", shape: "r", x: 40, y: 62, w: 40, h: 22 },
  { area: "Abdomen", shape: "r", x: 42, y: 84, w: 36, h: 22 },
  { area: "Pelvis", shape: "r", x: 40, y: 106, w: 40, h: 18 },
  { area: "Arms", shape: "r", x: 18, y: 62, w: 14, h: 50 },
  { area: "Wrists", shape: "r", x: 14, y: 112, w: 14, h: 12 },
  { area: "Hips", shape: "r", x: 38, y: 124, w: 44, h: 12 },
  { area: "Knees", shape: "r", x: 40, y: 166, w: 40, h: 14 },
  { area: "Ankles", shape: "r", x: 42, y: 206, w: 36, h: 10 },
];
const backZones: Zone[] = [
  { area: "Upper back", shape: "r", x: 40, y: 62, w: 40, h: 26 },
  { area: "Lower back", shape: "r", x: 42, y: 88, w: 36, h: 20 },
];

export function BodyMap({ selected, onToggle, intensity = {} }: { selected: BodyArea[]; onToggle?: (a: BodyArea) => void; intensity?: Partial<Record<BodyArea, number>> }) {
  const render = (list: Zone[], mirror: boolean) =>
    list.map((z) => {
      const on = selected.includes(z.area);
      const props = {
        onClick: () => onToggle?.(z.area),
        className: "cursor-pointer transition-all",
        style: { fill: on ? "var(--pain-high)" : "transparent", fillOpacity: on ? 0.55 : 0 },
      };
      const parts = [z];
      if (mirror && (z.area === "Arms" || z.area === "Wrists")) parts.push({ ...z, x: 120 - z.x - z.w });
      return parts.map((p, i) => (
        <g key={z.area + i}>
          <title>{z.area}</title>
          {p.shape === "e" ? <ellipse cx={p.x} cy={p.y} rx={p.w} ry={p.h} {...props} /> : <rect x={p.x} y={p.y} width={p.w} height={p.h} rx={6} {...props} />}
        </g>
      ));
    });

  const Silhouette = () => (
    <g style={{ fill: "var(--secondary)", stroke: "var(--sky)", strokeWidth: 1 }}>
      <ellipse cx={60} cy={22} rx={13} ry={16} />
      <rect x={54} y={36} width={12} height={12} rx={4} />
      <path d="M32 52 Q60 44 88 52 L84 124 Q60 132 36 124 Z" />
      <rect x={20} y={54} width={12} height={66} rx={6} />
      <rect x={88} y={54} width={12} height={66} rx={6} />
      <rect x={38} y={122} width={20} height={96} rx={9} />
      <rect x={62} y={122} width={20} height={96} rx={9} />
    </g>
  );

  return (
    <div className="grid grid-cols-2 gap-2">
      {[{ label: "Front", list: zones }, { label: "Back", list: [...backZones, ...zones.filter((z) => ["Head", "Neck", "Shoulders", "Hips", "Knees", "Ankles", "Arms"].includes(z.area))] }].map((side) => (
        <div key={side.label} className="text-center">
          <svg viewBox="0 0 120 225" className="mx-auto h-64 w-auto">
            <Silhouette />
            {render(side.list, true)}
          </svg>
          <p className="text-xs font-medium text-muted-foreground">{side.label}</p>
        </div>
      ))}
      {Object.keys(intensity).length > 0 && null}
    </div>
  );
}
