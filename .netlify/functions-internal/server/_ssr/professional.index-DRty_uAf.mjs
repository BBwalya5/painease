import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { i as useRoles } from "./AppShell-CREoi6Ey.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as getPatients, i as getPatientRequests, n as getFollowUps } from "./patientService-B30a3xN9.mjs";
import { n as useMyProProfile, t as ProfessionalPageShell } from "./ProfessionalShell-DY1WATXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional.index-DRty_uAf.js
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function ProfessionalDashboard() {
	const { isProfessional } = useRoles();
	const app = useMyProProfile();
	const d = app.data;
	const status = d?.status;
	const patients = useQuery({
		queryKey: ["pro-patients-dashboard"],
		queryFn: getPatients
	});
	const requests = useQuery({
		queryKey: ["pro-requests-dashboard"],
		queryFn: getPatientRequests
	});
	const followUps = useQuery({
		queryKey: ["pro-followups-dashboard"],
		queryFn: getFollowUps
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfessionalPageShell, {
		title: isProfessional ? "Professional Dashboard" : "Apply for verification",
		sub: "Your profile is shown to PainEase users only after an administrator has checked your licence.",
		children: app.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground",
			children: "Loading…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card flex items-start gap-3",
					children: [status === "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldCheck, { className: "h-6 w-6 shrink-0 text-teal" }) : status === "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ShieldX, { className: "h-6 w-6 shrink-0 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Clock, { className: "h-6 w-6 shrink-0 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-deep",
							children: status === "approved" ? "Verified" : status === "rejected" ? "Not approved" : status === "pending" ? "Waiting for review" : "Not yet applied"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: status === "approved" ? "You appear as verified in Ease Support. Changing your name, profession or licence details sends your profile back for review." : status === "rejected" ? `Reason: ${d?.review_note || "not given"}. Update your details to apply again.` : status === "pending" ? "An administrator will check your licence details. You are not shown to users until approved." : "Fill in your details to apply."
						})]
					})]
				}),
				d && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card grid gap-2 text-sm sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Name:"
							}),
							" ",
							d.full_name
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Profession:"
							}),
							" ",
							d.profession
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Facility:"
							}),
							" ",
							d.facility || "—"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Location:"
							}),
							" ",
							[d.district, d.province].filter(Boolean).join(", ") || "—"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "sm:col-span-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Services:"
								}),
								" ",
								d.services.join(", ") || "—"
							]
						})
					]
				}),
				!patients.isLoading && !patients.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-3 sm:grid-cols-4",
					children: [
						["Total patients", patients.data?.length ?? 0],
						["Rising pain", patients.data?.filter((p) => p.flag === "pain_rising").length ?? 0],
						["Inactive", patients.data?.filter((p) => p.flag === "inactive").length ?? 0],
						["Recent check-ins", patients.data?.filter((p) => p.lastCheckInAt).length ?? 0]
					].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-2xl font-bold text-deep",
							children: value
						})]
					}, String(label)))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/professional/requests",
						className: "card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Incoming requests"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-2xl font-bold text-deep",
								children: requests.data?.length ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-primary",
								children: "Review requests"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/professional/follow-ups",
						className: "card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Follow-ups due"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-2xl font-bold text-deep",
								children: followUps.data?.filter((item) => !item.completed).length ?? 0
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-primary",
								children: "View follow-ups"
							})
						]
					})]
				}),
				!patients.isLoading && !patients.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold text-deep",
						children: "Needs attention"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid gap-2",
						children: [patients.data?.filter((item) => item.flag === "pain_rising" || item.flag === "inactive").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/professional/patients/$patientId",
							params: { patientId: item.patient.id },
							className: "flex items-center justify-between rounded-xl border px-3 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-deep",
								children: item.patient.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-2 text-muted-foreground",
								children: item.flag === "pain_rising" ? "Pain rising" : "Inactive"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Open"
							})]
						}, item.patient.id)), !patients.data?.some((item) => item.flag === "pain_rising" || item.flag === "inactive") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No patients need immediate attention."
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/professional/profile",
					className: "btn-primary",
					children: d ? "Edit my profile" : "Start application"
				})
			]
		})
	});
}
var SplitComponent = ProfessionalDashboard;
//#endregion
export { SplitComponent as component };
