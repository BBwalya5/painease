import { i as __toESM } from "../_runtime.mjs";
import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as assignRoutine } from "./routineService-Mbz5OF1Y.mjs";
import { t as PainChart } from "./PainChart-CMF2ks06.mjs";
import { c as sendPatientNudge, r as getPatientDetail, s as scheduleFollowUp } from "./patientService-B30a3xN9.mjs";
import { t as ProfessionalPageShell } from "./ProfessionalShell-DY1WATXn.mjs";
import { t as Route } from "./professional.patients._patientId-ULeAo9IA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional.patients._patientId-DV3ObfIG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getPatientNotes(patientId) {
	if (!USE_MOCKS) return api.get(`/pro/patients/${patientId}/notes`);
	await delay();
	return [{
		id: "note-1",
		practitionerId: "practitioner-1",
		patientId,
		body: "Continue gentle routine and monitor sleep quality.",
		createdAt: "2026-10-28T08:00:00.000Z",
		updatedAt: "2026-10-28T08:00:00.000Z"
	}];
}
async function addPatientNote(patientId, body) {
	if (!USE_MOCKS) return api.post(`/pro/patients/${patientId}/notes`, { body });
	await delay();
	return {
		id: `note-${Date.now()}`,
		practitionerId: "practitioner-1",
		patientId,
		body,
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var tabs = [
	"Overview",
	"Check-ins",
	"Sessions",
	"Notes",
	"Care Plan",
	"Access"
];
function ProfessionalPatient({ patientId }) {
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [note, setNote] = (0, import_react.useState)("");
	const [nudge, setNudge] = (0, import_react.useState)("");
	const [followUpDate, setFollowUpDate] = (0, import_react.useState)("");
	const [followUpReason, setFollowUpReason] = (0, import_react.useState)("");
	const qc = useQueryClient();
	const patient = useQuery({
		queryKey: ["professional-patient", patientId],
		queryFn: () => getPatientDetail(patientId)
	});
	const notes = useQuery({
		queryKey: ["professional-notes", patientId],
		queryFn: () => getPatientNotes(patientId),
		enabled: tab === "Notes"
	});
	const [routineId, setRoutineId] = (0, import_react.useState)("routine-1");
	const addNote = useMutation({
		mutationFn: (body) => addPatientNote(patientId, body),
		onSuccess: () => {
			setNote("");
			qc.invalidateQueries({ queryKey: ["professional-notes", patientId] });
		}
	});
	const sendNudge = useMutation({
		mutationFn: (message) => sendPatientNudge(patientId, message),
		onSuccess: () => setNudge("")
	});
	const assign = useMutation({
		mutationFn: () => assignRoutine({
			patientId,
			routineId,
			heat: 2,
			vibration: 2,
			redLight: 1,
			durationMin: 15,
			timesPerWeek: 4,
			instructions: "Use gently after your daily check-in."
		}),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["professional-patient", patientId] })
	});
	const followUp = useMutation({
		mutationFn: () => scheduleFollowUp(patientId, patient.data?.patient.name ?? "Patient", followUpDate, followUpReason || "Review progress"),
		onSuccess: () => {
			setFollowUpDate("");
			setFollowUpReason("");
		}
	});
	const detail = patient.data;
	const chart = (detail?.checkIns ?? []).slice(0, 7).reverse().map((item) => ({
		day: item.date.slice(5),
		pain: item.painLevel,
		sleep: item.sleepQuality
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProfessionalPageShell, {
		title: detail?.patient.name ?? "Patient",
		sub: "Shared patient information and care actions.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/professional/patients",
				className: "mb-4 inline-flex items-center gap-2 text-sm font-medium text-primary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowLeft, { className: "h-4 w-4" }), "All patients"]
			}),
			patient.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card text-muted-foreground",
				children: "Loading patient…"
			}),
			patient.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "card text-destructive",
				children: "Patient data could not be loaded."
			}),
			!patient.isLoading && !patient.isError && detail && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-4 flex gap-2 overflow-x-auto",
					children: tabs.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `chip whitespace-nowrap ${tab === item ? "chip-on" : ""}`,
						onClick: () => setTab(item),
						children: item
					}, item))
				}),
				detail.link.status !== "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "card text-sm text-muted-foreground",
					children: "This patient's access link is no longer active. Shared clinical data is hidden."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "7-day average"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-3xl font-bold text-deep",
									children: [detail.avgPain7d ?? "—", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-base",
										children: "/10"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "card",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xl font-bold capitalize text-deep",
									children: detail.flag.replace("_", " ")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
								className: "card sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mb-3 font-semibold text-deep",
									children: "Pain trend"
								}), chart.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PainChart, { data: chart }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Pain history is not shared."
								})]
							})
						]
					}),
					tab === "Check-ins" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "card",
						children: detail.checkIns ? detail.checkIns.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b py-3 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-deep",
									children: [item.painLevel, "/10"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: item.date
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: item.notes || "No notes"
							})]
						}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Pain history has not been shared by this patient."
						})
					}),
					tab === "Sessions" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "card",
						children: detail.sessions ? detail.sessions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b py-3 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium text-deep",
								children: [item.actualMin, " minutes"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [
									"Pain ",
									item.painBefore,
									" → ",
									item.painAfter,
									"/10 · ",
									item.status
								]
							})]
						}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Device sessions have not been shared."
						})
					}),
					tab === "Notes" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [notes.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "Loading notes…"
							}) : notes.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-destructive",
								children: "Notes could not be loaded."
							}) : notes.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-b py-3 last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: item.body
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: new Date(item.createdAt).toLocaleString()
								})]
							}, item.id)), notes.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "No notes yet."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "w-full rounded-xl border px-3 py-2 text-sm",
								rows: 3,
								placeholder: "Write a private clinical note",
								value: note,
								onChange: (event) => setNote(event.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-primary",
								disabled: !note.trim() || addNote.isPending,
								onClick: () => addNote.mutate(note),
								children: "Add note"
							})
						]
					}),
					tab === "Care Plan" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-sm font-medium",
								children: ["Recommend a routine", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "mt-1 w-full rounded-xl border px-3 py-2",
									value: routineId,
									onChange: (event) => setRoutineId(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "routine-1",
											children: "Gentle Relief"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "routine-2",
											children: "Deep Relief"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "routine-3",
											children: "Evening Wind-down"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: "Safe starting settings: heat 2, vibration 2, red light 1, duration 15 minutes."
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn-primary",
								disabled: assign.isPending,
								onClick: () => assign.mutate(),
								children: assign.isPending ? "Assigning…" : "Assign routine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-sm font-medium",
									children: ["Send a short nudge", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										className: "mt-1 w-full rounded-xl border px-3 py-2",
										rows: 2,
										value: nudge,
										onChange: (event) => setNudge(event.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn-primary mt-2",
									disabled: !nudge.trim() || sendNudge.isPending,
									onClick: () => sendNudge.mutate(nudge),
									children: "Send nudge"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 font-medium text-deep",
										children: "Set a follow-up"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "datetime-local",
											className: "rounded-xl border px-3 py-2 text-sm",
											value: followUpDate,
											onChange: (event) => setFollowUpDate(event.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "rounded-xl border px-3 py-2 text-sm",
											placeholder: "Reason",
											value: followUpReason,
											onChange: (event) => setFollowUpReason(event.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn-primary mt-2",
										disabled: !followUpDate || followUp.isPending,
										onClick: () => followUp.mutate(),
										children: "Schedule"
									})
								]
							})
						]
					}),
					tab === "Access" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium text-deep",
							children: "Shared categories"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-3 space-y-2 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Pain history: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: detail.link.permissions.painHistory ? "Allowed" : "Hidden" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Device sessions: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: detail.link.permissions.deviceSessions ? "Allowed" : "Hidden" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["Clinical notes: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: detail.link.permissions.notes ? "Allowed" : "Hidden" })] })
							]
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "btn-secondary mt-4 inline-flex items-center gap-2",
					onClick: () => window.print(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Printer, { className: "h-4 w-4" }), "Print summary"]
				})
			] })
		]
	});
}
var SplitComponent = () => {
	const { patientId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfessionalPatient, { patientId });
};
//#endregion
export { SplitComponent as component };
