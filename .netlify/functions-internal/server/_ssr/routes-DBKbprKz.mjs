import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as PainChart } from "./PainChart-CMF2ks06.mjs";
import { n as getCheckIns } from "./checkInService-72wfdMQr.mjs";
import { n as getMySessions } from "./deviceService-DvuOW0Y_.mjs";
import { t as getProfile } from "./profileService-DVtQd_rL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DBKbprKz.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function Home() {
	const profile = useQuery({
		queryKey: ["profile"],
		queryFn: getProfile
	});
	const checkIns = useQuery({
		queryKey: ["checkins-dashboard"],
		queryFn: getCheckIns
	});
	const sessions = useQuery({
		queryKey: ["sessions-dashboard"],
		queryFn: getMySessions
	});
	const latest = checkIns.data?.[0];
	const lastSession = sessions.data?.[0];
	const chart = (checkIns.data ?? []).slice(0, 7).reverse().map((item) => ({
		day: item.date.slice(5),
		pain: item.painLevel,
		sleep: item.sleepQuality
	}));
	if (profile.isLoading || checkIns.isLoading || sessions.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-10 text-center text-muted-foreground",
		children: "Loading your dashboard…"
	});
	if (profile.isError || checkIns.isError || sessions.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "We couldn't load your dashboard. Please try again."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl bg-hero p-6 text-deep-foreground shadow-float",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm opacity-80",
						children: "Thursday, November 5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-1 text-3xl font-bold",
						children: ["Good morning, ", profile.data?.name]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/track",
						className: "mt-5 inline-flex rounded-xl bg-card px-4 py-3 font-semibold text-primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.HeartPulse, { className: "mr-2 h-5 w-5" }), latest ? "Complete today's check-in" : "Start a check-in"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Today's prompt"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-2xl font-bold text-deep",
							children: latest ? `${latest.painLevel}/10` : "Not logged"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Last session"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-semibold text-deep",
							children: lastSession ? `${lastSession.actualMin} min` : "No sessions yet"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/relief",
						className: "card bg-secondary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-primary",
							children: "Device"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-2 font-semibold text-deep",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Flame, { className: "h-5 w-5 text-teal" }), "Open controls"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-deep",
						children: "7-day pain trend"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Activity, { className: "h-5 w-5 text-teal" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainChart, { data: chart })]
			}),
			lastSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Clock3, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Last therapy: pain ",
						lastSession.painBefore,
						" → ",
						lastSession.painAfter,
						"/10"
					] })]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
