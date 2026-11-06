import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/AppShell";
import { PainChart } from "@/components/PainChart";
import { history, sessions, painColor } from "@/lib/sample-data";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Ease Journey — PainEase" },
      { name: "description", content: "Sessions completed, days tracked, trends and progress over time." },
      { property: "og:title", content: "Ease Journey — PainEase" },
      { property: "og:description", content: "A visual timeline of your pain management journey." },
    ],
  }),
  component: Journey,
});

const timeline = [
  { date: "24 Sep", title: "Started tracking", text: "First entry logged — lower back, 7/10." },
  { date: "28 Sep", title: "Connected PainEase Wrap", text: "Your first heat session." },
  { date: "2 Oct", title: "Found a pattern", text: "Insights linked sitting time to back pain." },
  { date: "5 Oct", title: "Added a mobility routine", text: "10-minute desk breaks, three times a day." },
  { date: "Today", title: "28 sessions", text: "You keep showing up for yourself." },
];

function Journey() {
  const stats = [
    { label: "Sessions completed", value: "28" },
    { label: "Days tracked", value: "14" },
    { label: "Average pain", value: "6.2 → 4.8" },
    { label: "Most common area", value: "Lower back" },
    { label: "Most-used therapy", value: "Heat" },
    { label: "Avg. session relief", value: "−2.1" },
  ];
  return (
    <div>
      <PageHeader eyebrow="Ease Journey" title="Your wellbeing journey, one step at a time" sub="Symptoms can go up and down — this is a record of what you've learned, not a test." />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="card">
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-deep">{s.value}</p>
          </div>
        ))}
      </div>
      <section className="card mt-5">
        <h2 className="font-semibold text-deep">Pain trend · 90 days</h2>
        <div className="mt-3"><PainChart data={history[90]} height={240} /></div>
      </section>
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <section className="card">
          <h2 className="font-semibold text-deep">Progress timeline</h2>
          <ol className="mt-4 space-y-5 border-l-2 border-accent pl-5">
            {timeline.map((t) => (
              <li key={t.title} className="relative">
                <span className="absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-teal ring-4 ring-card" />
                <p className="text-xs text-muted-foreground">{t.date}</p>
                <p className="font-semibold text-deep">{t.title}</p>
                <p className="text-sm text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="card">
          <h2 className="font-semibold text-deep">Recent sessions</h2>
          <p className="text-sm text-muted-foreground">User-reported before / after scores</p>
          <ul className="mt-4 divide-y">
            {sessions.map((s) => (
              <li key={s.date} className="flex items-center justify-between py-3">
                <div className="min-w-0"><p className="truncate font-medium">{s.routine}</p><p className="text-xs text-muted-foreground">{s.date} · {s.therapy}</p></div>
                <p className="shrink-0 font-semibold"><span style={{ color: painColor(s.before) }}>{s.before}</span> → <span style={{ color: painColor(s.after) }}>{s.after}</span></p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
