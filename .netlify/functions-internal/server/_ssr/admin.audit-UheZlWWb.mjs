import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as AdminPageShell, o as getAuditLogs, t as AdminError } from "./AdminShell-D-r0_fNc.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.audit-UheZlWWb.js
var import_jsx_runtime = require_jsx_runtime();
function AuditPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageShell, {
		title: "Compliance and audit trail",
		sub: "Consent activity and practitioner access records.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Audit, {})
	});
}
function Audit() {
	const q = useQuery({
		queryKey: ["admin-audit"],
		queryFn: getAuditLogs
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading audit trail…" });
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: q.error });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: q.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-deep",
					children: item.detail
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: new Date(item.createdAt).toLocaleString()
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					item.actorName,
					" · ",
					item.action
				]
			})]
		}, item.id))
	});
}
var SplitComponent = AuditPage;
//#endregion
export { SplitComponent as component };
