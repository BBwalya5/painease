import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as getPatients } from "./patientService-B30a3xN9.mjs";
import { t as ProfessionalPageShell } from "./ProfessionalShell-DY1WATXn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional.patients-T6qHBTIc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var labels = {
	improving: "Improving",
	stable: "Stable",
	pain_rising: "Pain rising",
	inactive: "Inactive"
};
function ProfessionalPatients() {
	const [search, setSearch] = (0, import_react.useState)("");
	const patients = useQuery({
		queryKey: ["professional-patients"],
		queryFn: getPatients
	});
	const visible = (patients.data ?? []).filter((item) => {
		if (item.link.status !== "active") return false;
		const term = search.toLowerCase().trim();
		return !term || item.patient.name.toLowerCase().includes(term) || item.patient.email.toLowerCase().includes(term);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProfessionalPageShell, {
		title: "Patients",
		sub: "Patients appear here only after they accept your link request.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-center gap-2 rounded-xl border bg-card px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Search, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "w-full bg-transparent py-3 text-sm outline-none",
					placeholder: "Search patient",
					value: search,
					onChange: (event) => setSearch(event.target.value)
				})]
			}),
			patients.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "card text-muted-foreground",
				children: "Loading patients…"
			}),
			patients.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "card text-destructive",
				children: "Patients could not be loaded."
			}),
			!patients.isLoading && !patients.isError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3",
				children: [visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/professional/patients/$patientId",
					params: { patientId: item.patient.id },
					className: "card flex items-center justify-between gap-4 hover:border-primary/30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-deep",
						children: item.patient.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: [
							item.patient.painType,
							" · Avg. 7-day pain ",
							item.avgPain7d ?? "—",
							"/10"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `chip whitespace-nowrap ${item.flag === "pain_rising" ? "bg-destructive/10 text-destructive" : item.flag === "improving" ? "chip-on" : ""}`,
						children: labels[item.flag]
					})]
				}, item.patient.id)), visible.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card text-center text-sm text-muted-foreground",
					children: "No accepted patients match this search."
				})]
			})
		]
	});
}
var SplitComponent = ProfessionalPatients;
//#endregion
export { SplitComponent as component };
