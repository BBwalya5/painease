import { i as __toESM } from "../_runtime.mjs";
import { a as register, n as login, r as loginWithGoogle } from "./authService-BHEc1Daz.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as require_lucide_react } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-bnHs-e-J.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lucide_react = require_lucide_react();
var accounts = {
	user: {
		email: "user@painease.test",
		password: "User123"
	},
	professional: {
		email: "professional@painease.test",
		password: "Professional123"
	},
	admin: {
		email: "admin@painease.test",
		password: "Admin123"
	}
};
function AuthPage() {
	const navigate = useNavigate();
	const [role, setRole] = (0, import_react.useState)("user");
	const [mode, setMode] = (0, import_react.useState)("in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)(accounts.user.email);
	const [password, setPassword] = (0, import_react.useState)(accounts.user.password);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [googleBusy, setGoogleBusy] = (0, import_react.useState)(false);
	const choose = (next) => {
		setRole(next);
		setEmail(accounts[next].email);
		setPassword(accounts[next].password);
		setError("");
	};
	const submit = async (e) => {
		e.preventDefault();
		setBusy(true);
		setError("");
		try {
			const session = mode === "up" ? await register({
				name,
				email,
				role: "user"
			}) : await login(email, password, role);
			const target = session.user.role === "admin" ? "/admin" : session.user.role === "professional" ? "/professional" : "/track";
			await navigate({
				to: target,
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Sign-in failed");
		} finally {
			setBusy(false);
		}
	};
	const joinWithGoogle = async () => {
		setGoogleBusy(true);
		setError("");
		try {
			const session = await loginWithGoogle();
			const target = session.user.role === "admin" ? "/admin" : session.user.role === "professional" ? "/professional" : "/track";
			await navigate({
				to: target,
				replace: true
			});
		} catch (err) {
			setError(err instanceof Error ? err.message : "Google sign-in failed");
		} finally {
			setGoogleBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative flex min-h-screen items-center justify-center overflow-hidden bg-soft px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-24 top-20 h-64 w-64 rounded-full bg-teal/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-float backdrop-blur md:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-hero hidden min-h-[640px] flex-col justify-between p-10 text-white md:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/painease-logo.png",
							alt: "PainEase",
							className: "h-12 w-auto max-w-[190px] rounded-lg bg-white px-3 py-2 object-contain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-12 max-w-sm text-4xl font-bold leading-tight",
							children: "Understand your pain. Find your ease."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-sm text-sm leading-6 text-white/75",
							children: "Track patterns, discover guidance, and connect with the right support when you need it."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						children: [
							{
								Icon: import_lucide_react.Activity,
								text: "Personal pain tracking"
							},
							{
								Icon: import_lucide_react.ShieldCheck,
								text: "Private and secure"
							},
							{
								Icon: import_lucide_react.UserRound,
								text: "Support when you need it"
							}
						].map(({ Icon, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-white/90" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(text) })]
						}, text))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[620px] items-center px-6 py-10 sm:px-10 md:px-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-md mx-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/painease-logo.png",
								alt: "PainEase",
								className: "mx-auto mb-6 h-12 w-auto max-w-[190px] object-contain md:hidden"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-7",
								children: [
									mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mb-2 text-sm font-semibold text-teal",
										children: "Join PainEase"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display text-3xl font-bold text-deep",
										children: mode === "in" ? "Welcome back" : "Create your account"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground",
										children: mode === "in" ? "Sign in to continue your wellness journey." : "Start tracking and understanding your pain."
									})
								]
							}),
							mode === "in" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
								children: "Choose a preview module"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6 grid grid-cols-3 gap-2 rounded-2xl bg-soft p-1.5",
								children: [
									"user",
									"professional",
									"admin"
								].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => choose(item),
									className: `rounded-xl px-2 py-2.5 text-sm font-semibold capitalize transition ${role === item ? "bg-white text-primary shadow-soft" : "text-muted-foreground hover:text-deep"}`,
									children: item
								}, item))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: joinWithGoogle,
								disabled: googleBusy || busy,
								className: "flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-deep shadow-soft transition hover:border-primary/30 hover:bg-soft disabled:cursor-not-allowed disabled:opacity-60",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									"aria-hidden": "true",
									viewBox: "0 0 24 24",
									className: "h-5 w-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#4285F4",
											d: "M21.6 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.38a4.6 4.6 0 0 1-2 3.02v2.55h3.24c1.89-1.74 2.98-4.31 2.98-7.42z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#34A853",
											d: "M12 22c2.7 0 4.97-.9 6.63-2.35l-3.24-2.55c-.9.6-2.05.96-3.39.96-2.61 0-4.83-1.76-5.62-4.13H3.04v2.63A10 10 0 0 0 12 22z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#FBBC05",
											d: "M6.38 13.93A6 6 0 0 1 6.06 12c0-.67.12-1.32.32-1.93V7.44H3.04A10 10 0 0 0 2 12c0 1.61.39 3.14 1.04 4.56l3.34-2.63z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#EA4335",
											d: "M12 5.94c1.47 0 2.79.51 3.83 1.5l2.87-2.87A9.6 9.6 0 0 0 12 2a10 10 0 0 0-8.96 5.44l3.34 2.63C7.17 7.7 9.39 5.94 12 5.94z"
										})
									]
								}), googleBusy ? mode === "in" ? "Signing in..." : "Joining..." : mode === "in" ? "Continue with Google" : "Join with Google"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-5 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-muted-foreground",
										children: "or use email"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: submit,
								className: "space-y-4",
								children: [
									mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-sm font-medium text-deep",
										children: ["Full name", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.UserRound, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "w-full rounded-xl border bg-white py-3 pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10",
												placeholder: "Your name",
												value: name,
												onChange: (e) => setName(e.target.value),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-sm font-medium text-deep",
										children: ["Email address", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Mail, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "w-full rounded-xl border bg-white py-3 pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10",
												type: "email",
												placeholder: "you@example.com",
												value: email,
												onChange: (e) => setEmail(e.target.value),
												required: true
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "block text-sm font-medium text-deep",
										children: ["Password", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative mt-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.LockKeyhole, { className: "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "w-full rounded-xl border bg-white py-3 pl-10 pr-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10",
												type: "password",
												placeholder: "Enter your password",
												value: password,
												onChange: (e) => setPassword(e.target.value),
												required: true
											})]
										})]
									}),
									error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										role: "alert",
										className: "rounded-xl bg-destructive/10 px-3 py-2.5 text-sm text-destructive",
										children: error
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "btn-primary w-full",
										disabled: busy,
										children: [busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowRight, { className: "h-4 w-4" })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-sm font-semibold text-primary hover:underline",
									onClick: () => {
										setMode(mode === "in" ? "up" : "in");
										setError("");
									},
									children: mode === "in" ? "Create an account" : "Back to sign in"
								})
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { AuthPage as component };
