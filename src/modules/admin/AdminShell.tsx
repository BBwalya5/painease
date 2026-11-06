import type { ReactNode } from "react";
import { PageHeader } from "@/components/AppShell";
import { useRoles } from "@/hooks/use-roles";

export function AdminError({ error }: { error: unknown }) {
  return (
    <p
      role="alert"
      className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive"
    >
      {error instanceof Error ? error.message : "Something went wrong"}
    </p>
  );
}

export function AdminPageShell({
  title,
  sub,
  children,
}: {
  title: string;
  sub: string;
  children: ReactNode;
}) {
  const { ready, isAdmin } = useRoles();

  if (!ready) {
    return <p className="text-muted-foreground">Checking access…</p>;
  }
  if (!isAdmin) {
    return (
      <section className="card">
        <h1 className="text-xl font-bold text-deep">No access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This area is only for PainEase administrators.
        </p>
      </section>
    );
  }

  return (
    <div>
      <PageHeader eyebrow="Admin" title={title} sub={sub} />
      {children}
    </div>
  );
}
