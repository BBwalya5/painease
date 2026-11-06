import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Leaf } from "lucide-react";
import { GuideChat } from "@/components/GuideChat";
import { PageHeader, Disclaimer } from "@/components/AppShell";
import { SafetyCheck } from "@/components/SafetyCheck";
import { conditions } from "@/lib/conditions";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: "Ease Guide — PainEase" },
      { name: "description", content: "Understand what your body is telling you: a safety check, plain-language guides and reviewed comfort resources." },
      { property: "og:title", content: "Ease Guide — PainEase" },
      { property: "og:description", content: "Understand what your body is telling you, with safety guidance first." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Guide,
});

function Guide() {
  return (
    <div>
      <PageHeader eyebrow="Ease Guide" title="Let's understand what your body is telling you" sub="Start with a short safety check, then explore plain-language guides. This is general information, not a diagnosis." />

      <SafetyCheck />

      <section className="card mt-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-teal"><Leaf className="h-4 w-4" /> Ask Ease Guide</div>
        <p className="mt-1 mb-3 text-xs text-muted-foreground">AI-powered general information. It cannot diagnose. In an emergency, go to the nearest clinic or hospital.</p>
        <GuideChat />
      </section>

      <section className="mt-5">
        <h2 className="font-semibold text-deep">Browse the guides</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {conditions.map((c) => (
            <Link key={c.slug} to="/conditions/$slug" params={{ slug: c.slug }} className="card flex items-start gap-3 transition hover:-translate-y-0.5">
              <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <div className="flex-1">
                <h3 className="font-semibold text-deep">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 text-teal" />
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-5">
        <Disclaimer>PainEase offers general health information and comfort support. It cannot diagnose a condition or identify which organ is affected. If your symptoms are severe, sudden or worrying, please see a nurse, clinical officer or doctor.</Disclaimer>
      </div>
    </div>
  );
}
