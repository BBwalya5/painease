import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getAdminUsers, d as setUserStatus, n as AdminPageShell, t as AdminError } from "./AdminShell-D-r0_fNc.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-DQIE5rhI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UsersPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageShell, {
		title: "User management",
		sub: "Search, view, suspend and reactivate accounts.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
	});
}
function Users() {
	const [search, setSearch] = (0, import_react.useState)("");
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["admin-users"],
		queryFn: getAdminUsers
	});
	const mutation = useMutation({
		mutationFn: (args) => setUserStatus(args.id, args.status),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-users"] })
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Loading users…"
	});
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminError, { error: q.error });
	const users = q.data?.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())) ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: "mb-4 w-full max-w-md rounded-xl border px-3 py-2",
		placeholder: "Search users",
		value: search,
		onChange: (e) => setSearch(e.target.value)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-2",
		children: users.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-deep",
				children: user.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					user.email,
					" · ",
					user.role
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				className: user.status === "active" ? "text-sm font-semibold text-destructive" : "text-sm font-semibold text-teal",
				onClick: () => mutation.mutate({
					id: user.id,
					status: user.status === "active" ? "suspended" : "active"
				}),
				children: user.status === "active" ? "Suspend" : "Reactivate"
			})]
		}, user.id))
	})] });
}
var SplitComponent = UsersPage;
//#endregion
export { SplitComponent as component };
