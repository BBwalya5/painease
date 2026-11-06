import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as getPractitioners, n as AdminPageShell, t as AdminError, u as reviewPractitioner } from "./AdminShell-D-r0_fNc.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.professionals-C1o4Q1xh.js
var import_jsx_runtime = require_jsx_runtime();
function ProfessionalsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageShell, {
		title: "Practitioner verification",
		sub: "Review credentials and approve or reject applications.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Professionals, {})
	});
}
function Professionals() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["admin-practitioners"],
		queryFn: getPractitioners
	});
	const m = useMutation({
		mutationFn: (args) => reviewPractitioner(args.id, args.approved),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-practitioners"] })
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading practitioners…" });
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: q.error });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-3",
		children: q.data?.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold text-deep",
					children: item.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						item.profession,
						" · ",
						item.licenseNumber,
						" · ",
						item.clinic
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "chip capitalize",
					children: item.status
				})]
			}), item.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-primary",
					onClick: () => m.mutate({
						id: item.id,
						approved: true
					}),
					children: "Approve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-secondary text-destructive",
					onClick: () => m.mutate({
						id: item.id,
						approved: false
					}),
					children: "Reject"
				})]
			})]
		}, item.id))
	});
}
var SplitComponent = ProfessionalsPage;
//#endregion
export { SplitComponent as component };
