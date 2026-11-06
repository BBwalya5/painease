import { i as __toESM } from "../_runtime.mjs";
import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as getProfile } from "./profileService-DVtQd_rL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/womens-DygtsdHp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getCycleEntries() {
	if (!USE_MOCKS) return api.get("/me/cycles");
	await delay();
	return [{
		id: "cycle-1",
		userId: "user-1",
		startDate: "2026-10-12",
		endDate: "2026-10-17",
		flow: "medium",
		symptoms: ["cramps", "fatigue"]
	}];
}
async function addCycleEntry(input) {
	if (!USE_MOCKS) return api.post("/me/cycles", input);
	await delay();
	return {
		...input,
		id: `cycle-${Date.now()}`,
		userId: "user-1"
	};
}
function Womens() {
	const profile = useQuery({
		queryKey: ["cycle-profile"],
		queryFn: getProfile
	});
	const cycles = useQuery({
		queryKey: ["cycles"],
		queryFn: getCycleEntries
	});
	const qc = useQueryClient();
	const [start, setStart] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => addCycleEntry({
			startDate: start,
			endDate: null,
			flow: "medium",
			symptoms: []
		}),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["cycles"] })
	});
	if (profile.isLoading || cycles.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "card text-muted-foreground",
		children: "Loading cycle tracking…"
	});
	if (profile.data?.painType === "musculoskeletal") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-bold text-deep",
			children: "Cycle tracking"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Cycle tracking is optional and is shown for reproductive pain profiles."
		})]
	});
	if (profile.isError || cycles.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "Couldn't load cycle tracking."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "Cycle tracking"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-3xl font-bold text-deep",
			children: "Reproductive health"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block text-sm font-medium",
				children: ["Cycle start date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "mt-1 w-full rounded-xl border px-3 py-2",
					type: "date",
					value: start,
					onChange: (e) => setStart(e.target.value)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: "btn-primary mt-3",
				disabled: !start || add.isPending,
				onClick: () => add.mutate(),
				children: "Add cycle entry"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-4 card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-deep",
				children: "Recent entries"
			}), cycles.data?.length ? cycles.data.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					item.startDate,
					" · ",
					item.flow,
					" flow"
				]
			}, item.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "No entries yet."
			})]
		})
	] });
}
//#endregion
export { Womens as component };
