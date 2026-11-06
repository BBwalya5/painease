export const user = { name: "Amara", device: "PainEase Wrap S2", battery: 78 };

export const bodyAreas = [
  "Head", "Neck", "Shoulders", "Upper back", "Lower back", "Chest", "Abdomen", "Pelvis", "Arms", "Wrists", "Hips", "Knees", "Ankles",
] as const;
export type BodyArea = (typeof bodyAreas)[number];

function series(days: number, start: number, end: number) {
  return Array.from({ length: days }, (_, i) => {
    const t = i / Math.max(1, days - 1);
    const base = start + (end - start) * t;
    const wobble = Math.sin(i * 1.7) * 0.9 + Math.cos(i * 0.6) * 0.5;
    const d = new Date(2026, 9, 8);
    d.setDate(d.getDate() - (days - 1 - i));
    return {
      day: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      pain: Math.max(1, Math.min(10, Math.round((base + wobble) * 10) / 10)),
      sleep: Math.round((6.4 + Math.sin(i) * 0.9) * 10) / 10,
    };
  });
}
export const history = { 7: series(7, 5.6, 5), 30: series(30, 6.3, 5), 90: series(90, 6.6, 4.8) };

export const commonAreas = [
  { area: "Lower back", pct: 46 },
  { area: "Neck", pct: 22 },
  { area: "Pelvis", pct: 18 },
  { area: "Knees", pct: 14 },
];

export const sessions = [
  { date: "Today, 08:10", routine: "Morning back release", mins: 20, before: 6, after: 4, therapy: "Heat + Stretching" },
  { date: "Yesterday", routine: "Desk-break mobility", mins: 10, before: 5, after: 4, therapy: "Mobility" },
  { date: "6 Oct", routine: "Evening wind-down", mins: 25, before: 7, after: 5, therapy: "Red light + Breathing" },
  { date: "5 Oct", routine: "Cycle comfort", mins: 30, before: 7, after: 4, therapy: "Heat + Vibration" },
];

export const insights = [
  { tag: "Pattern", text: "Your lower-back pain has appeared most frequently after prolonged sitting (3+ hours)." },
  { tag: "What helps", text: "Your reported pain was 1.4 points lower on days when you completed your mobility routine." },
  { tag: "Sleep", text: "On nights with under 6 hours of sleep, next-day pain was reported higher in 7 of 9 entries." },
  { tag: "Cycle", text: "Pelvic discomfort tends to peak on days 1–2 of your cycle. Heat sessions show your strongest relief." },
];

export const library = [
  { title: "Understanding back pain", cat: "Back pain", kind: "Article", mins: 6 },
  { title: "Easing menstrual cramps", cat: "Menstrual pain", kind: "Video", mins: 8 },
  { title: "Pelvic floor relaxation", cat: "Pelvic pain", kind: "Exercise", mins: 12 },
  { title: "Muscle soreness vs. strain", cat: "Muscle pain", kind: "Article", mins: 5 },
  { title: "Gentle joint mobility", cat: "Joint pain", kind: "Exercise", mins: 10 },
  { title: "Living well with chronic pain", cat: "Chronic pain", kind: "Article", mins: 9 },
  { title: "Post-run recovery flow", cat: "Sports recovery", kind: "Video", mins: 14 },
  { title: "How heat therapy works", cat: "Heat therapy", kind: "Article", mins: 4 },
  { title: "Vibration for tension relief", cat: "Vibration", kind: "Video", mins: 6 },
  { title: "Red-light therapy explained", cat: "Red-light therapy", kind: "Article", mins: 7 },
  { title: "5-minute desk stretches", cat: "Stretching", kind: "Exercise", mins: 5 },
  { title: "Hip & spine mobility", cat: "Mobility", kind: "Exercise", mins: 15 },
  { title: "Body-scan relaxation", cat: "Relaxation", kind: "Video", mins: 10 },
  { title: "Sleep positions for pain", cat: "Sleep", kind: "Article", mins: 6 },
];

export const patients = [
  { id: "p1", name: "Amara Banda", area: "Lower back", avg: 4.8, trend: -1.4, sessions: 28, next: "12 Oct", status: "Improving" },
  { id: "p2", name: "Daniel Mwale", area: "Knees", avg: 5.9, trend: -0.6, sessions: 15, next: "10 Oct", status: "Stable" },
  { id: "p3", name: "Grace Tembo", area: "Pelvis", avg: 6.4, trend: 0.3, sessions: 9, next: "9 Oct", status: "Needs follow-up" },
  { id: "p4", name: "Joseph Phiri", area: "Neck", avg: 3.9, trend: -2.1, sessions: 34, next: "18 Oct", status: "Improving" },
  { id: "p5", name: "Ruth Zulu", area: "Shoulders", avg: 5.2, trend: -0.2, sessions: 11, next: "14 Oct", status: "Stable" },
];

export const painColor = (v: number) => (v <= 3 ? "var(--pain-low)" : v <= 6 ? "var(--pain-mid)" : "var(--pain-high)");
