import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AlertTriangle, ArrowLeft, Heart, Sparkles, Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { conditionBySlug } from "@/lib/conditions";

export const Route = createFileRoute("/conditions/$slug")({
  loader: ({ params }) => {
    const c = conditionBySlug(params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — PainEase` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.name} — PainEase` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:type", content: "article" },
          { name: "twitter:card", content: "summary" },
        ]
      : [{ title: "Condition not found — PainEase" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="card"><p>We couldn't find that condition.</p><Link to="/conditions" className="text-primary">See all conditions</Link></div>
  ),
  component: ConditionPage,
});

function List({ icon: Icon, title, items, tone = "text-teal" }: { icon: typeof Heart; title: string; items: string[]; tone?: string }) {
  return (
    <section className="card">
      <h2 className="mb-3 flex items-center gap-2 font-semibold text-deep"><Icon className={`h-4 w-4 ${tone}`} />{title}</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm">{items.map((i) => <li key={i}>{i}</li>)}</ul>
    </section>
  );
}

function ConditionPage() {
  const c = Route.useLoaderData();
  return (
    <div>
      <Link to="/conditions" className="mb-3 inline-flex items-center gap-1 text-sm text-primary"><ArrowLeft className="h-4 w-4" />All conditions</Link>
      <PageHeader eyebrow="Condition" title={c.name} sub={c.summary} />
      <div className="grid gap-5 lg:grid-cols-2">
        <List icon={Stethoscope} title="Common symptoms" items={c.symptoms} />
        <List icon={Heart} title="Things that may help" items={c.selfCare} />
        <section className="card">
          <h2 className="mb-3 flex items-center gap-2 font-semibold text-deep"><Sparkles className="h-4 w-4 text-teal" />Therapies in PainEase</h2>
          <div className="flex flex-wrap gap-2">{c.therapies.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/track" className="btn-primary">Log my pain</Link>
            <Link to="/relief" className="btn-ghost">Start relief</Link>
          </div>
        </section>
        <List icon={AlertTriangle} title="See a health worker if" items={c.seeHelp} tone="text-destructive" />
      </div>
      <p className="mt-5 text-xs text-muted-foreground">This is general information, not medical advice. If you're worried, talk to a doctor or nurse.</p>
    </div>
  );
}
