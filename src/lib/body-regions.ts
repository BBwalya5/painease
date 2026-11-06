export type Side = "left" | "right";
export type View = "front" | "back";

export type RegionPart = {
  part: string;
  label: string;
  sided: boolean;
  views: View[];
};

export const regionParts: RegionPart[] = [
  { part: "head", label: "Head", sided: false, views: ["front", "back"] },
  { part: "face", label: "Face", sided: false, views: ["front"] },
  { part: "neck", label: "Neck", sided: false, views: ["front", "back"] },
  { part: "shoulder", label: "Shoulder", sided: true, views: ["front", "back"] },
  { part: "chest", label: "Chest", sided: false, views: ["front"] },
  { part: "breast", label: "Breast", sided: true, views: ["front"] },
  { part: "ribs", label: "Ribs", sided: true, views: ["front"] },
  { part: "abdomen", label: "Abdomen", sided: false, views: ["front"] },
  { part: "pelvis", label: "Pelvis", sided: false, views: ["front"] },
  { part: "groin", label: "Groin", sided: false, views: ["front"] },
  { part: "upper-back", label: "Upper back", sided: false, views: ["back"] },
  { part: "lower-back", label: "Lower back", sided: false, views: ["back"] },
  { part: "hip", label: "Hip", sided: true, views: ["front", "back"] },
  { part: "arm", label: "Upper arm", sided: true, views: ["front", "back"] },
  { part: "elbow", label: "Elbow", sided: true, views: ["front", "back"] },
  { part: "wrist", label: "Wrist", sided: true, views: ["front", "back"] },
  { part: "hand", label: "Hand", sided: true, views: ["front", "back"] },
  { part: "thigh", label: "Thigh", sided: true, views: ["front", "back"] },
  { part: "knee", label: "Knee", sided: true, views: ["front", "back"] },
  { part: "calf", label: "Calf / lower leg", sided: true, views: ["front", "back"] },
  { part: "ankle", label: "Ankle", sided: true, views: ["front", "back"] },
  { part: "foot", label: "Foot", sided: true, views: ["front", "back"] },
];

export type RegionKey = string; // "neck" or "knee:left"

export const allRegionKeys: RegionKey[] = regionParts.flatMap((p) => (p.sided ? [`${p.part}:left`, `${p.part}:right`] : [p.part]));

export function regionLabel(key: RegionKey): string {
  const [part, side] = key.split(":");
  const p = regionParts.find((r) => r.part === part);
  const base = p?.label ?? part ?? key;
  return side ? `${side === "left" ? "Left" : "Right"} ${base.toLowerCase()}` : base;
}

// Shapes drawn on a 120 x 225 canvas. "r" = shape on the viewer's right half.
// Front view: the person's left side appears on the viewer's right. Back view is the opposite.
type Shape = { kind: "ellipse"; cx: number; cy: number; rx: number; ry: number } | { kind: "rect"; x: number; y: number; w: number; h: number };
type ShapeDef = { part: string; view: View | "both"; shape: Shape; mirror?: boolean };

const defs: ShapeDef[] = [
  { part: "head", view: "front", shape: { kind: "ellipse", cx: 60, cy: 11, rx: 11, ry: 8 } },
  { part: "face", view: "front", shape: { kind: "ellipse", cx: 60, cy: 25, rx: 10, ry: 7 } },
  { part: "head", view: "back", shape: { kind: "ellipse", cx: 60, cy: 18, rx: 12, ry: 15 } },
  { part: "neck", view: "both", shape: { kind: "rect", x: 54, y: 34, w: 12, h: 9 } },
  { part: "shoulder", view: "both", mirror: true, shape: { kind: "ellipse", cx: 39, cy: 49, rx: 9, ry: 6 } },
  { part: "chest", view: "front", shape: { kind: "rect", x: 47, y: 45, w: 26, h: 9 } },
  { part: "breast", view: "front", mirror: true, shape: { kind: "ellipse", cx: 52, cy: 61, rx: 7, ry: 6 } },
  { part: "ribs", view: "front", mirror: true, shape: { kind: "rect", x: 38, y: 58, w: 7, h: 20 } },
  { part: "abdomen", view: "front", shape: { kind: "rect", x: 47, y: 69, w: 26, h: 18 } },
  { part: "pelvis", view: "front", shape: { kind: "rect", x: 46, y: 89, w: 28, h: 10 } },
  { part: "groin", view: "front", shape: { kind: "rect", x: 53, y: 101, w: 14, h: 8 } },
  { part: "upper-back", view: "back", shape: { kind: "rect", x: 42, y: 46, w: 36, h: 26 } },
  { part: "lower-back", view: "back", shape: { kind: "rect", x: 44, y: 74, w: 32, h: 18 } },
  { part: "hip", view: "both", mirror: true, shape: { kind: "ellipse", cx: 41, cy: 99, rx: 6, ry: 8 } },
  { part: "arm", view: "both", mirror: true, shape: { kind: "rect", x: 24, y: 56, w: 10, h: 27 } },
  { part: "elbow", view: "both", mirror: true, shape: { kind: "ellipse", cx: 28, cy: 88, rx: 5, ry: 4 } },
  { part: "wrist", view: "both", mirror: true, shape: { kind: "ellipse", cx: 25, cy: 112, rx: 4, ry: 3 } },
  { part: "hand", view: "both", mirror: true, shape: { kind: "ellipse", cx: 24, cy: 123, rx: 5, ry: 7 } },
  { part: "thigh", view: "both", mirror: true, shape: { kind: "rect", x: 45, y: 112, w: 13, h: 33 } },
  { part: "knee", view: "both", mirror: true, shape: { kind: "ellipse", cx: 51.5, cy: 151, rx: 7, ry: 5.5 } },
  { part: "calf", view: "both", mirror: true, shape: { kind: "rect", x: 46, y: 159, w: 11, h: 34 } },
  { part: "ankle", view: "both", mirror: true, shape: { kind: "ellipse", cx: 51.5, cy: 198, rx: 4.5, ry: 3.5 } },
  { part: "foot", view: "both", mirror: true, shape: { kind: "ellipse", cx: 51, cy: 210, rx: 7, ry: 5 } },
];

function mirrorShape(s: Shape): Shape {
  return s.kind === "ellipse" ? { ...s, cx: 120 - s.cx } : { ...s, x: 120 - s.x - s.w };
}

export type DrawnRegion = { key: RegionKey; shape: Shape };

export function regionsForView(view: View): DrawnRegion[] {
  const out: DrawnRegion[] = [];
  for (const d of defs) {
    if (d.view !== "both" && d.view !== view) continue;
    if (!d.mirror) { out.push({ key: d.part, shape: d.shape }); continue; }
    // Viewer-left shape: person's right in front view, person's left in back view.
    const viewerLeft: Side = view === "front" ? "right" : "left";
    const viewerRight: Side = viewerLeft === "right" ? "left" : "right";
    out.push({ key: `${d.part}:${viewerLeft}`, shape: d.shape });
    out.push({ key: `${d.part}:${viewerRight}`, shape: mirrorShape(d.shape) });
  }
  return out;
}

// Non-clickable filler so the figure reads as a body.
export const fillerShapes: Shape[] = [
  { kind: "rect", x: 23, y: 92, w: 8, h: 17 },
  { kind: "rect", x: 89, y: 92, w: 8, h: 17 },
];
