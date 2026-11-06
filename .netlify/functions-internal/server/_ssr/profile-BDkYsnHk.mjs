import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as SignOutButton } from "./SignOutButton-DZMCaJSo.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as updateProfile, t as getProfile } from "./profileService-DVtQd_rL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BDkYsnHk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Profile() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["profile-page"],
		queryFn: getProfile
	});
	const [name, setName] = (0, import_react.useState)("");
	const [age, setAge] = (0, import_react.useState)("");
	const [painType, setPainType] = (0, import_react.useState)("musculoskeletal");
	const mutation = useMutation({
		mutationFn: () => updateProfile({
			name: name || q.data?.name,
			age: age ? +age : null,
			painType
		}),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["profile-page"] })
	});
	if (q.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "card text-muted-foreground",
		children: "Loading profile…"
	});
	if (q.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "Couldn't load profile."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "Profile"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-3xl font-bold text-deep",
			children: q.data?.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card max-w-xl space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-1 w-full rounded-xl border px-3 py-2",
						defaultValue: q.data?.name,
						onChange: (e) => setName(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["Age", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-1 w-full rounded-xl border px-3 py-2",
						type: "number",
						defaultValue: q.data?.age ?? "",
						onChange: (e) => setAge(e.target.value)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm font-medium",
					children: ["Pain type", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-1 w-full rounded-xl border px-3 py-2",
						defaultValue: q.data?.painType ?? "musculoskeletal",
						onChange: (e) => setPainType(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "reproductive",
								children: "Reproductive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "musculoskeletal",
								children: "Musculoskeletal"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "both",
								children: "Both"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-primary",
					onClick: () => mutation.mutate(),
					children: mutation.isPending ? "Saving…" : "Save profile"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignOutButton, { className: "mt-4 max-w-xl" })
	] });
}
//#endregion
export { Profile as component };
