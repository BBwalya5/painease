import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { r as PageHeader } from "./AppShell-CREoi6Ey.mjs";
import { t as Route } from "./conditions._slug-BPgNAUeL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/conditions._slug-BQXBXGiw.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function List({ icon: Icon, title, items, tone = "text-teal" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
			className: "mb-3 flex items-center gap-2 font-semibold text-deep",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${tone}` }), title]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "list-disc space-y-1 pl-5 text-sm",
			children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
		})]
	});
}
function ConditionPage() {
	const c = Route.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/conditions",
			className: "mb-3 inline-flex items-center gap-1 text-sm text-primary",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "h-4 w-4" }), "All conditions"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Condition",
			title: c.name,
			sub: c.summary
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					icon: import_lucide_react.Stethoscope,
					title: "Common symptoms",
					items: c.symptoms
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					icon: import_lucide_react.Heart,
					title: "Things that may help",
					items: c.selfCare
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mb-3 flex items-center gap-2 font-semibold text-deep",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Sparkles, { className: "h-4 w-4 text-teal" }), "Therapies in PainEase"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: c.therapies.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chip",
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/track",
								className: "btn-primary",
								children: "Log my pain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/relief",
								className: "btn-ghost",
								children: "Start relief"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					icon: import_lucide_react.AlertTriangle,
					title: "See a health worker if",
					items: c.seeHelp,
					tone: "text-destructive"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-5 text-xs text-muted-foreground",
			children: "This is general information, not medical advice. If you're worried, talk to a doctor or nurse."
		})
	] });
}
//#endregion
export { ConditionPage as component };
