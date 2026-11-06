import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as getAssignedRoutines, r as getRoutines } from "./routineService-Mbz5OF1Y.mjs";
import { t as PainChart } from "./PainChart-CMF2ks06.mjs";
import { n as getCheckIns } from "./checkInService-72wfdMQr.mjs";
import { n as getMySessions } from "./deviceService-DvuOW0Y_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-BVx1ILyo.js
var import_jsx_runtime = require_jsx_runtime();
function Insights() {
	const checkIns = useQuery({
		queryKey: ["insights-checkins"],
		queryFn: getCheckIns
	});
	const sessions = useQuery({
		queryKey: ["insights-sessions"],
		queryFn: getMySessions
	});
	const routines = useQuery({
		queryKey: ["insights-routines"],
		queryFn: getRoutines
	});
	const assigned = useQuery({
		queryKey: ["assigned-routines"],
		queryFn: getAssignedRoutines
	});
	if (checkIns.isLoading || sessions.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "card text-muted-foreground",
		children: "Loading insights…"
	});
	if (checkIns.isError || sessions.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "We couldn't load insights."
	});
	const chart = (checkIns.data ?? []).slice(0, 14).reverse().map((item) => ({
		day: item.date.slice(5),
		pain: item.painLevel,
		sleep: item.sleepQuality
	}));
	const areas = (checkIns.data ?? []).flatMap((item) => item.bodyAreas).reduce((acc, item) => {
		acc[item] = (acc[item] ?? 0) + 1;
		return acc;
	}, {});
	const drops = (sessions.data ?? []).filter((item) => item.painAfter !== null && item.painBefore !== null).map((item) => ({
		name: routines.data?.find((r) => r.id === item.routineId)?.name ?? "Custom session",
		drop: (item.painBefore ?? 0) - (item.painAfter ?? 0)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "Ease Insights"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-3xl font-bold text-deep",
			children: "Your pain patterns"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-semibold text-deep",
				children: "Pain over time"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainChart, { data: chart })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-deep",
					children: "Pain by body area"
				}), Object.entries(areas).length ? Object.entries(areas).map(([area, count]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "capitalize",
						children: area.replaceAll("-", " ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-primary",
						children: count
					})]
				}, area)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "No area data yet."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-deep",
					children: "Routines that helped most"
				}), drops.length ? drops.slice(0, 4).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-teal",
						children: [item.drop, " point drop"]
					})]
				}, `${item.name}-${item.drop}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Complete a session to compare results."
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-deep",
				children: "Assigned routines"
			}), assigned.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading…" }) : assigned.data?.length ? assigned.data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					item.timesPerWeek,
					" times/week · ",
					item.instructions
				]
			}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "No routines assigned yet."
			})]
		})
	] });
}
//#endregion
export { Insights as component };
