import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { a as mockFAQs, c as mockPractitioners, d as mockUsers, i as mockDevices, l as mockRoutines, t as mockAuditLogs } from "./data-B2J0LzkN.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useRoles, r as PageHeader } from "./AppShell-CREoi6Ey.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminShell-D-r0_fNc.js
var import_jsx_runtime = require_jsx_runtime();
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getAdminStats() {
	if (!USE_MOCKS) return api.get("/admin/stats");
	await delay();
	return {
		totalUsers: mockUsers.filter((u) => u.role === "user").length,
		activeThisWeek: 3,
		checkIns: 30,
		sessions: 12,
		devices: mockDevices.length,
		pendingApprovals: mockPractitioners.filter((p) => p.status === "pending").length
	};
}
async function getAdminUsers() {
	if (!USE_MOCKS) return api.get("/admin/users");
	await delay();
	return mockUsers;
}
async function setUserStatus(id, status) {
	if (!USE_MOCKS) return api.patch(`/admin/users/${id}/status`, { status });
	await delay();
	return {
		...mockUsers.find((u) => u.id === id),
		status
	};
}
async function getPractitioners() {
	if (!USE_MOCKS) return api.get("/admin/practitioners");
	await delay();
	return mockPractitioners;
}
async function reviewPractitioner(id, approved, reason) {
	if (!USE_MOCKS) return api.post(`/admin/practitioners/${id}/${approved ? "approve" : "reject"}`, reason ? { reason } : {});
	await delay();
	return {
		...mockPractitioners.find((p) => p.id === id),
		status: approved ? "approved" : "rejected",
		rejectionReason: approved ? null : reason ?? "Review declined"
	};
}
async function getAdminDevices() {
	if (!USE_MOCKS) return api.get("/admin/devices");
	await delay();
	return mockDevices;
}
async function getRoutinesAdmin() {
	if (!USE_MOCKS) return api.get("/admin/routines");
	await delay();
	return mockRoutines;
}
async function getFAQs() {
	if (!USE_MOCKS) return api.get("/admin/faqs");
	await delay();
	return mockFAQs;
}
async function getAuditLogs() {
	if (!USE_MOCKS) return api.get("/admin/audit-logs");
	await delay();
	return mockAuditLogs;
}
function AdminError({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive",
		children: error instanceof Error ? error.message : "Something went wrong"
	});
}
function AdminPageShell({ title, sub, children }) {
	const { ready, isAdmin } = useRoles();
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Checking access…"
	});
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-bold text-deep",
			children: "No access"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "This area is only for PainEase administrators."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Admin",
		title,
		sub
	}), children] });
}
//#endregion
export { getAdminUsers as a, getPractitioners as c, setUserStatus as d, getAdminStats as i, getRoutinesAdmin as l, AdminPageShell as n, getAuditLogs as o, getAdminDevices as r, getFAQs as s, AdminError as t, reviewPractitioner as u };
