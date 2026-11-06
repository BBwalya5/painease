import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home, Activity, Sparkles, Route as RouteIcon, User, BookOpen, Flower2, Stethoscope, Brain, MoreVertical, LayoutDashboard, Users, ClipboardCheck, Building2, FileText, Library, UserCog } from "lucide-react";
import { useSessionUser } from "@/hooks/use-session";
import { useRoles } from "@/hooks/use-roles";
import { SignOutButton } from "@/components/SignOutButton";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const main = [
  { to: "/", label: "Home", icon: Home },
  { to: "/track", label: "Ease Map", icon: Activity },
  { to: "/guide", label: "Ease Guide", icon: Sparkles },
  { to: "/journey", label: "Ease Journey", icon: RouteIcon },
  { to: "/profile", label: "Profile", icon: User },
] as const;
const more = [
  { to: "/relief", label: "Ease Routines", icon: Sparkles },
  { to: "/insights", label: "Ease Insights", icon: Brain },
  { to: "/library", label: "Ease Library", icon: BookOpen },
  { to: "/conditions", label: "Conditions", icon: BookOpen },
  { to: "/womens", label: "Women's Ease", icon: Flower2 },
  { to: "/provider", label: "Ease Support", icon: Stethoscope },
] as const;

const professionalNavigation = [
  { to: "/professional", label: "Overview", icon: LayoutDashboard },
  { to: "/professional/requests", label: "Requests", icon: Stethoscope },
  { to: "/professional/patients", label: "Patients", icon: Users },
  { to: "/professional/follow-ups", label: "Follow-ups", icon: ClipboardCheck },
  { to: "/professional/profile", label: "My profile", icon: UserCog },
] as const;

const adminNavigation = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/professionals", label: "Professionals", icon: ClipboardCheck },
  { to: "/admin/library", label: "Ease Library", icon: Library },
  { to: "/admin/facilities", label: "Facilities", icon: Building2 },
  { to: "/admin/audit", label: "Audit log", icon: FileText },
] as const;

const professionalBottomNavigation = [
  { to: "/professional", label: "Overview", icon: LayoutDashboard },
  { to: "/professional/requests", label: "Requests", icon: Stethoscope },
  { to: "/professional/patients", label: "Patients", icon: Users },
  { to: "/professional/follow-ups", label: "Follow-ups", icon: ClipboardCheck },
  { to: "/professional/profile", label: "Profile", icon: UserCog },
] as const;

const adminBottomNavigation = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/professionals", label: "Reviews", icon: ClipboardCheck },
  { to: "/admin/library", label: "Library", icon: Library },
  { to: "/admin/audit", label: "Audit", icon: FileText },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/painease-logo.png"
        alt="PainEase"
        className="h-9 w-auto max-w-[150px] object-contain lg:max-w-[220px]"
      />
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { isAdmin, isProfessional } = useRoles();
  const roleNavigation = isAdmin ? adminNavigation : isProfessional ? professionalNavigation : null;
  const primaryNavigation = roleNavigation ?? main;
  const secondaryNavigation = roleNavigation ? [] : more;
  const bottomNavigation = isAdmin
    ? adminBottomNavigation
    : isProfessional
      ? professionalBottomNavigation
      : main;
  const bottomGridClass = isAdmin
    ? "grid-cols-5"
    : isProfessional
      ? "grid-cols-5"
      : "grid-cols-5";

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r bg-card p-6 lg:flex">
        <Logo />
        <nav className="flex flex-col gap-1">
          {primaryNavigation.map((n) => <SideLink key={n.to} {...n} />)}
          {secondaryNavigation.length > 0 && <p className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Explore</p>}
          {secondaryNavigation.map((n) => <SideLink key={n.to} {...n} />)}
        </nav>
        <AccountLink />
        {!roleNavigation && <div className="mt-auto rounded-2xl bg-soft p-4 text-sm">
          <p className="font-semibold text-deep">Track → Understand → Manage</p>
          <p className="mt-1 text-muted-foreground">Record → Learn → Improve</p>
        </div>}
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/85 px-5 py-3 backdrop-blur lg:hidden">
          <Logo />
          <MobileMenu />
        </header>
        <main className="mx-auto max-w-5xl px-5 pt-6 pb-32 lg:px-10 lg:pt-10 lg:pb-16">{children}</main>
      </div>

      <nav className={`fixed inset-x-3 bottom-3 z-30 grid ${bottomGridClass} rounded-3xl border bg-card/95 p-1.5 shadow-float backdrop-blur lg:hidden`}>
        {bottomNavigation.map((n) => (
          <Link key={n.to} to={n.to} className="flex flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-medium text-muted-foreground" activeProps={{ className: "bg-secondary text-primary" }} activeOptions={{ exact: n.to === "/" }}>
            <n.icon className="h-5 w-5" />
            {n.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function MobileMenu() {
  const { isAdmin, isProfessional } = useRoles();
  const { user } = useSessionUser();
  const userNavigation = [
    ...main,
    ...more.filter((item) => item.to !== "/womens"),
    ...((user?.painType === "reproductive" || user?.painType === "both")
      ? more.filter((item) => item.to === "/womens")
      : []),
  ];
  const navigation = isAdmin
    ? adminNavigation
    : isProfessional
      ? professionalNavigation
      : userNavigation;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open navigation menu"
          className="grid h-10 w-10 place-items-center rounded-full text-deep hover:bg-muted"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[min(85vw,320px)] overflow-y-auto p-5">
        <SheetHeader className="pr-8 text-left">
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-5 flex flex-col gap-1">
          {navigation.map((item) => (
            <SheetClose key={item.to} asChild>
              <Link
                to={item.to}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-muted"
                activeProps={{ className: "bg-secondary text-primary" }}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
        <div className="mt-5 border-t pt-5">
          <SheetClose asChild>
            <AccountLink />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function AccountLink({ compact = false }: { compact?: boolean }) {
  const { user, ready } = useSessionUser();
  if (!ready) return null;
  if (!user) return <Link to="/auth" search={{}} className={compact ? "rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground" : "btn-primary"}>Sign in</Link>;
  const profileTo = user.role === "professional"
    ? "/professional/profile"
    : user.role === "admin"
      ? "/admin"
      : "/profile";
  return (
    <div className={compact ? "flex items-center gap-2" : "space-y-2"}>
      <Link to={profileTo} className={compact ? "grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs font-bold text-primary" : "block rounded-xl border px-3 py-2 text-sm text-muted-foreground"}>
        {compact ? (user.email?.[0] ?? "U").toUpperCase() : <>Signed in as <span className="font-medium text-foreground">{user.email}</span></>}
      </Link>
      {!compact && (
        <SignOutButton />
      )}
    </div>
  );
}

function SideLink({ to, label, icon: Icon }: { to: string; label: string; icon: typeof Home }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted" activeProps={{ className: "bg-secondary text-primary" }} activeOptions={{ exact: to === "/" }}>
      <Icon className="h-4.5 w-4.5" /> {label}
    </Link>
  );
}

export function PageHeader({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6 animate-rise">
      {eyebrow && <p className="text-sm font-semibold text-teal">{eyebrow}</p>}
      <h1 className="mt-1 text-3xl font-bold text-deep lg:text-4xl">{title}</h1>
      {sub && <p className="mt-2 max-w-xl text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return <p className="rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">{children}</p>;
}
