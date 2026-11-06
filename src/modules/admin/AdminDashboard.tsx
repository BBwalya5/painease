import { useQuery } from "@tanstack/react-query";
import { getAdminStats } from "@/services/adminService";
import { AdminError, AdminPageShell } from "./AdminShell";

type Stats = {
  users: number;
  users_7d: number;
  active_7d: number;
  entries: number;
  entries_7d: number;
  guide_messages: number;
  guide_messages_7d: number;
  professionals_approved: number;
  professionals_pending: number;
  articles_published: number;
  articles_draft: number;
  facilities_verified: number;
  facilities_unverified: number;
  admins: number;
};

export function AdminDashboard() {
  return (
    <AdminPageShell
      title="Admin Dashboard"
      sub="Every number here comes straight from the live database."
    >
      <Overview />
    </AdminPageShell>
  );
}

export function Overview() {
  const stats = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });

  if (stats.isError) return <AdminError error={stats.error} />;
  const summary = stats.data;
  const cards: [string, string | number | undefined, string?][] = [
    ["Total users", summary?.totalUsers],
    ["Active this week", summary?.activeThisWeek],
    ["Check-ins", summary?.checkIns],
    ["Sessions", summary?.sessions],
    ["Devices", summary?.devices],
    ["Pending approvals", summary?.pendingApprovals],
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map(([label, value, sub]) => (
          <div key={label} className="card">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-deep">
              {value ?? "…"}
            </p>
            {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
