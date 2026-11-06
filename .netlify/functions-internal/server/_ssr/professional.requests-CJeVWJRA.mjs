import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as getPatientRequests, o as respondToPatientRequest } from "./patientService-B30a3xN9.mjs";
import { t as ProfessionalPageShell } from "./ProfessionalShell-DY1WATXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional.requests-CJeVWJRA.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function ProfessionalRequests() {
	const qc = useQueryClient();
	const inviteLink = `${typeof window !== "undefined" ? window.location.origin : ""}/provider?code=PE-2041-ZM`;
	const requests = useQuery({
		queryKey: ["professional-requests"],
		queryFn: getPatientRequests
	});
	const respond = useMutation({
		mutationFn: ({ id, accept }) => respondToPatientRequest(id, accept),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["professional-requests"] })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProfessionalPageShell, {
		title: "Requests and invite",
		sub: "Review requests sent by users and share your link or code.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
						children: "Your professional code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
							className: "text-xl tracking-widest text-deep",
							children: "PE-2041-ZM"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "chip",
							onClick: () => navigator.clipboard?.writeText("PE-2041-ZM"),
							children: "Copy code"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-3 text-sm font-medium text-primary",
						onClick: () => navigator.clipboard?.writeText(inviteLink),
						children: "Copy patient invite link"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 font-semibold text-deep",
				children: "Incoming requests"
			}),
			requests.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card text-muted-foreground",
				children: "Loading requests…"
			}),
			requests.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "card text-destructive",
				children: "Requests could not be loaded."
			}),
			!requests.isLoading && !requests.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [(requests.data ?? []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-deep",
								children: item.patientName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: item.patientEmail
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "chip",
								children: "Pending"
							})]
						}),
						item.message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: item.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "btn-primary flex items-center gap-2",
								disabled: respond.isPending,
								onClick: () => respond.mutate({
									id: item.id,
									accept: true
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Check, { className: "h-4 w-4" }), "Accept"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "rounded-xl border px-4 py-2 text-sm font-medium text-destructive",
								disabled: respond.isPending,
								onClick: () => respond.mutate({
									id: item.id,
									accept: false
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.X, { className: "mr-1 inline h-4 w-4" }), "Decline"]
							})]
						})
					]
				}, item.id)), (requests.data ?? []).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card text-center text-sm text-muted-foreground",
					children: "No pending requests."
				})]
			}),
			respond.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "mt-3 text-sm text-destructive",
				children: "The request could not be updated."
			})
		]
	});
}
var SplitComponent = ProfessionalRequests;
//#endregion
export { SplitComponent as component };
