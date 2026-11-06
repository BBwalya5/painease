import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as getRoutinesAdmin, n as AdminPageShell, s as getFAQs, t as AdminError } from "./AdminShell-D-r0_fNc.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.library-BYJWJV11.js
var import_jsx_runtime = require_jsx_runtime();
function LibraryPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageShell, {
		title: "Content management",
		sub: "Create and edit routines, FAQs and announcements.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LibraryAdmin, {})
	});
}
function LibraryAdmin() {
	const routines = useQuery({
		queryKey: ["admin-routines"],
		queryFn: getRoutinesAdmin
	});
	const faqs = useQuery({
		queryKey: ["admin-faqs"],
		queryFn: getFAQs
	});
	if (routines.isLoading || faqs.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading content…" });
	if (routines.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: routines.error });
	if (faqs.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: faqs.error });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-deep",
				children: "Routines"
			}), routines.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-xl border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-muted-foreground",
					children: [
						"Heat ",
						item.heat,
						" · vibration ",
						item.vibration,
						" · ",
						item.durationMin,
						" min"
					]
				})]
			}, item.id))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-deep",
				children: "FAQs"
			}), faqs.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-xl border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: item.question
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: item.answer
				})]
			}, item.id))]
		})]
	});
}
var SplitComponent = LibraryPage;
//#endregion
export { SplitComponent as component };
