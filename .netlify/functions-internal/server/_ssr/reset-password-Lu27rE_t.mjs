import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reset-password-Lu27rE_t.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResetPassword() {
	const navigate = useNavigate();
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const submit = (e) => {
		e.preventDefault();
		if (password.length < 8) return setError("Use at least 8 characters.");
		if (password !== confirm) return setError("The passwords don't match.");
		navigate({ to: "/auth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-md py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-deep",
				children: "Set a new password"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "mt-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						className: "w-full rounded-xl border px-3 py-2",
						placeholder: "New password",
						value: password,
						onChange: (e) => setPassword(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "password",
						className: "w-full rounded-xl border px-3 py-2",
						placeholder: "Repeat password",
						value: confirm,
						onChange: (e) => setConfirm(e.target.value)
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "text-sm text-destructive",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn-primary w-full",
						children: "Save password"
					})
				]
			})]
		})
	});
}
//#endregion
export { ResetPassword as component };
