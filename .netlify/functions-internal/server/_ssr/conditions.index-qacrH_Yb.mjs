import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./AppShell-CREoi6Ey.mjs";
import { n as conditions } from "./conditions-Dtcf8RFg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conditions.index-qacrH_Yb.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function ConditionsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Learn",
		title: "Conditions",
		sub: "General information to help you understand your pain. Not a diagnosis."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2",
		children: conditions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/conditions/$slug",
			params: { slug: c.slug },
			className: "card flex items-start gap-3 transition hover:-translate-y-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-deep",
					children: c.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: c.summary
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ChevronRight, { className: "mt-1 h-4 w-4 text-teal" })]
		}, c.slug))
	})] });
}
//#endregion
export { ConditionsPage as component };
