import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as getFollowUps, t as completeFollowUp } from "./patientService-B30a3xN9.mjs";
import { t as ProfessionalPageShell } from "./ProfessionalShell-DY1WATXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional.follow-ups-8ExyCiLh.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function ProfessionalFollowUps() {
	const qc = useQueryClient();
	const followUps = useQuery({
		queryKey: ["professional-follow-ups"],
		queryFn: getFollowUps
	});
	const complete = useMutation({
		mutationFn: completeFollowUp,
		onSuccess: () => qc.invalidateQueries({ queryKey: ["professional-follow-ups"] })
	});
	const pending = (followUps.data ?? []).filter((item) => !item.completed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProfessionalPageShell, {
		title: "Follow-ups",
		sub: "Upcoming patient reviews and follow-up actions.",
		children: [
			followUps.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card text-muted-foreground",
				children: "Loading follow-ups…"
			}),
			followUps.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "card text-destructive",
				children: "Follow-ups could not be loaded."
			}),
			!followUps.isLoading && !followUps.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [pending.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.CalendarCheck, { className: "mt-0.5 h-5 w-5 text-teal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-deep",
								children: item.patientName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: item.reason
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: new Date(item.dueAt).toLocaleString()
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "chip whitespace-nowrap",
						disabled: complete.isPending,
						onClick: () => complete.mutate(item.id),
						children: "Complete"
					})]
				}, item.id)), pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card text-center text-sm text-muted-foreground",
					children: "No follow-ups are due."
				})]
			})
		]
	});
}
var SplitComponent = ProfessionalFollowUps;
//#endregion
export { SplitComponent as component };
