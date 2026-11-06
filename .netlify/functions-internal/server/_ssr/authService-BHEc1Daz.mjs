import { n as api, r as setToken, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { c as mockPractitioners, d as mockUsers } from "./data-B2J0LzkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authService-BHEc1Daz.js
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
var SESSION_KEY = "painease.demo-session";
var notifySessionChange = (session) => {
	if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("painease-session-change", { detail: session }));
};
async function login(email, password, role) {
	if (!USE_MOCKS) {
		const session = await api.post("/auth/login", {
			email,
			password,
			role
		});
		setToken(session.token);
		localStorage.setItem(SESSION_KEY, JSON.stringify(session));
		notifySessionChange(session);
		return session;
	}
	await delay();
	const user = mockUsers.find((item) => item.role === role && item.email.toLowerCase() === email.toLowerCase()) ?? mockUsers.find((item) => item.email.toLowerCase() === email.toLowerCase());
	if (!user) throw new Error("No demo account matches that sign-in.");
	const session = {
		token: `demo-${user.role}-token`,
		user,
		practitioner: mockPractitioners.find((item) => item.userId === user.id) ?? null
	};
	setToken(session.token);
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	notifySessionChange(session);
	return session;
}
async function register(input) {
	if (!USE_MOCKS) {
		const session = await api.post("/auth/register", input);
		setToken(session.token);
		localStorage.setItem(SESSION_KEY, JSON.stringify(session));
		notifySessionChange(session);
		return session;
	}
	await delay();
	const session = {
		token: "demo-user-token",
		user: {
			id: `user-${Date.now()}`,
			email: String(input.email ?? ""),
			name: String(input.name ?? "PainEase User"),
			role: "user",
			age: null,
			painType: null,
			goals: [],
			status: "active",
			onboarded: false,
			consentAcceptedAt: null,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			lastActiveAt: (/* @__PURE__ */ new Date()).toISOString()
		},
		practitioner: null
	};
	setToken(session.token);
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	notifySessionChange(session);
	return session;
}
async function loginWithGoogle() {
	if (!USE_MOCKS) throw new Error("Google sign-in is not configured on the backend yet.");
	await delay();
	const user = mockUsers.find((item) => item.role === "user" && item.id === "user-1");
	if (!user) throw new Error("Google demo account is unavailable.");
	const session = {
		token: "demo-google-token",
		user,
		practitioner: null
	};
	setToken(session.token);
	localStorage.setItem(SESSION_KEY, JSON.stringify(session));
	notifySessionChange(session);
	return session;
}
async function getCurrentSession() {
	if (!USE_MOCKS) return api.get("/auth/me");
	await delay();
	const value = localStorage.getItem(SESSION_KEY);
	return value ? JSON.parse(value) : null;
}
async function logout() {
	if (!USE_MOCKS) await api.post("/auth/logout");
	else {
		await delay();
		localStorage.removeItem(SESSION_KEY);
	}
	setToken(null);
	notifySessionChange(null);
}
//#endregion
export { register as a, logout as i, login as n, loginWithGoogle as r, getCurrentSession as t };
