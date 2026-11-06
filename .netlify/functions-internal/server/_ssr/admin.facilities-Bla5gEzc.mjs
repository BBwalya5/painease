import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as AdminPageShell, r as getAdminDevices, t as AdminError } from "./AdminShell-D-r0_fNc.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.facilities-Bla5gEzc.js
var import_jsx_runtime = require_jsx_runtime();
function FacilitiesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageShell, {
		title: "Device registry",
		sub: "Add and manage wearable inventory and assignments.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Facilities, {})
	});
}
function Facilities() {
	const q = useQuery({
		queryKey: ["admin-devices"],
		queryFn: getAdminDevices
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading devices…" });
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: q.error });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: q.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card flex flex-wrap justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-deep",
				children: item.serial
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs capitalize text-muted-foreground",
				children: item.type.replaceAll("_", " ")
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "chip capitalize",
				children: item.status
			})]
		}, item.id))
	});
}
var SplitComponent = FacilitiesPage;
//#endregion
export { SplitComponent as component };
