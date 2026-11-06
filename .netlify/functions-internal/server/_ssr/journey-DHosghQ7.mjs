import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as PageHeader } from "./AppShell-CREoi6Ey.mjs";
import { t as PainChart } from "./PainChart-CMF2ks06.mjs";
import { n as painColor, r as sessions, t as history } from "./sample-data-Ca8EjBQR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/journey-DHosghQ7.js
var import_jsx_runtime = require_jsx_runtime();
var timeline = [
	{
		date: "24 Sep",
		title: "Started tracking",
		text: "First entry logged — lower back, 7/10."
	},
	{
		date: "28 Sep",
		title: "Connected PainEase Wrap",
		text: "Your first heat session."
	},
	{
		date: "2 Oct",
		title: "Found a pattern",
		text: "Insights linked sitting time to back pain."
	},
	{
		date: "5 Oct",
		title: "Added a mobility routine",
		text: "10-minute desk breaks, three times a day."
	},
	{
		date: "Today",
		title: "28 sessions",
		text: "You keep showing up for yourself."
	}
];
function Journey() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Ease Journey",
			title: "Your wellbeing journey, one step at a time",
			sub: "Symptoms can go up and down — this is a record of what you've learned, not a test."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 lg:grid-cols-3",
			children: [
				{
					label: "Sessions completed",
					value: "28"
				},
				{
					label: "Days tracked",
					value: "14"
				},
				{
					label: "Average pain",
					value: "6.2 → 4.8"
				},
				{
					label: "Most common area",
					value: "Lower back"
				},
				{
					label: "Most-used therapy",
					value: "Heat"
				},
				{
					label: "Avg. session relief",
					value: "−2.1"
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: s.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-2xl font-bold text-deep",
					children: s.value
				})]
			}, s.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-deep",
				children: "Pain trend · 90 days"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainChart, {
					data: history[90],
					height: 240
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-5 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-deep",
					children: "Progress timeline"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-5 border-l-2 border-accent pl-5",
					children: timeline.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[27px] top-1 h-3 w-3 rounded-full bg-teal ring-4 ring-card" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: t.date
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-deep",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: t.text
							})
						]
					}, t.title))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-deep",
						children: "Recent sessions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "User-reported before / after scores"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y",
						children: sessions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-medium",
									children: s.routine
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										s.date,
										" · ",
										s.therapy
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "shrink-0 font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: painColor(s.before) },
										children: s.before
									}),
									" → ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: painColor(s.after) },
										children: s.after
									})
								]
							})]
						}, s.date))
					})
				]
			})]
		})
	] });
}
//#endregion
export { Journey as component };
