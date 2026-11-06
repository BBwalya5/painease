import { i as __toESM } from "../_runtime.mjs";
import { i as logout, t as getCurrentSession } from "./authService-BHEc1Daz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SignOutButton-DZMCaJSo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
function useSessionUser() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		const applySession = (value) => {
			if (!active) return;
			setSession(value);
			setUser(value?.user ?? null);
			setReady(true);
		};
		const refresh = () => {
			getCurrentSession().then((value) => {
				applySession(value);
			}).catch(() => {
				applySession(null);
			});
		};
		const onSessionChange = (event) => {
			const value = event.detail;
			applySession(value);
		};
		const onStorage = (event) => {
			if (event.key === "painease.demo-session") refresh();
		};
		refresh();
		window.addEventListener("painease-session-change", onSessionChange);
		window.addEventListener("storage", onStorage);
		return () => {
			active = false;
			window.removeEventListener("painease-session-change", onSessionChange);
			window.removeEventListener("storage", onStorage);
		};
	}, []);
	const signOut = async () => {
		await logout();
		setSession(null);
		setUser(null);
	};
	return {
		user,
		session,
		ready,
		signOut
	};
}
function SignOutButton({ className = "" }) {
	const navigate = useNavigate();
	const { signOut } = useSessionUser();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const handleSignOut = async () => {
		setBusy(true);
		setError("");
		try {
			await signOut();
			await navigate({
				to: "/auth",
				replace: true
			});
		} catch (signOutError) {
			setError(signOutError instanceof Error ? signOutError.message : "Could not sign out.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: handleSignOut,
			disabled: busy,
			className: "flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/20 px-3 py-2.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LogOut, { className: "h-4 w-4" }), busy ? "Signing out..." : "Sign out"]
		}), error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			className: "mt-2 text-xs text-destructive",
			children: error
		})]
	});
}
//#endregion
export { useSessionUser as n, SignOutButton as t };
