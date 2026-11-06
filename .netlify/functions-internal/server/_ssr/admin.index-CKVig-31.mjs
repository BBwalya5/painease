import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as getAdminStats, n as AdminPageShell, t as AdminError } from "./AdminShell-D-r0_fNc.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-CKVig-31.js
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageShell, {
		title: "Admin Dashboard",
		sub: "Every number here comes straight from the live database.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overview, {})
	});
}
function Overview() {
	const stats = useQuery({
		queryKey: ["admin-stats"],
		queryFn: getAdminStats
	});
	if (stats.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: stats.error });
	const summary = stats.data;
	const cards = [
		["Total users", summary?.totalUsers],
		["Active this week", summary?.activeThisWeek],
		["Check-ins", summary?.checkIns],
		["Sessions", summary?.sessions],
		["Devices", summary?.devices],
		["Pending approvals", summary?.pendingApprovals]
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
			children: cards.map(([label, value, sub]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl font-bold text-deep",
						children: value ?? "…"
					}),
					sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: sub
					})
				]
			}, label))
		})
	});
}
var SplitComponent = AdminDashboard;
//#endregion
export { SplitComponent as component };
