import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
  useMatchRoute,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSessionUser } from "../hooks/use-session";

import appCss from "../styles.css?url";
import { AppShell } from "../components/AppShell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PainEase — Understand your body. Find your comfort. Discover your Ease." },
      { name: "description", content: "PainEase helps girls and women in Zambia understand their symptoms, find safe comfort and know when to seek care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const matchRoute = useMatchRoute();
  const authOnly = matchRoute({ to: "/auth" }) || matchRoute({ to: "/reset-password" });
  const { user, ready } = useSessionUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const home = user?.role === "admin" ? "/admin" : user?.role === "professional" ? "/professional" : "/track";
  const inSection = (p: string) => pathname === p || pathname.startsWith(p + "/");
  const outside = !!user && !authOnly && (
    user.role === "admin" ? !inSection("/admin")
    : user.role === "professional" ? !inSection("/professional")
    : inSection("/admin") || inSection("/professional"));
  useEffect(() => {
    if (!ready) return;
    if (!user && !authOnly) navigate({ to: "/auth", replace: true });
    else if (user && (pathname === "/" || outside)) navigate({ to: home, replace: true });
  }, [ready, user, authOnly, pathname, outside]);
  if (!authOnly && (!ready || !user || pathname === "/" || outside)) {
    return <QueryClientProvider client={queryClient}><div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div></QueryClientProvider>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      {authOnly ? <Outlet /> : <AppShell><Outlet /></AppShell>}
    </QueryClientProvider>
  );
}
