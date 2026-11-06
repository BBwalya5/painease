import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { PageHeader } from "@/components/AppShell";
import { conditions } from "@/lib/conditions";

export const Route = createFileRoute("/conditions/")({
  head: () => ({
    meta: [
      { title: "Conditions — PainEase" },
      { name: "description", content: "Plain-language guides to menstrual pain, fibroids, endometriosis, PCOS, back pain and more." },
      { property: "og:title", content: "Conditions — PainEase" },
      { property: "og:description", content: "Understand your pain condition and what can help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConditionsPage,
});

function ConditionsPage() {
  return (
    <div>
      <PageHeader eyebrow="Learn" title="Conditions" sub="General information to help you understand your pain. Not a diagnosis." />
      <div className="grid gap-4 sm:grid-cols-2">
        {conditions.map((c) => (
          <Link key={c.slug} to="/conditions/$slug" params={{ slug: c.slug }} className="card flex items-start gap-3 transition hover:-translate-y-0.5">
            <div className="flex-1">
              <h2 className="font-semibold text-deep">{c.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.summary}</p>
            </div>
            <ChevronRight className="mt-1 h-4 w-4 text-teal" />
          </Link>
        ))}
      </div>
    </div>
  );
}
