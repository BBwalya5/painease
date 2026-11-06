//#region node_modules/.nitro/vite/services/ssr/assets/api-aVES2gL9.js
var API_BASE_URL = ({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "qqujsfrfnviobdmpbukx",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_m0Aa55894M7VuyOar8dDtQ_cg594zGX",
	"VITE_SUPABASE_URL": "https://qqujsfrfnviobdmpbukx.supabase.co"
}["VITE_API_BASE_URL"] || "http://localhost:3001/api/v1").replace(/\/+$/, "");
/** Mock data is used unless VITE_USE_MOCKS is explicitly "false". */
var USE_MOCKS = {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_PROJECT_ID": "qqujsfrfnviobdmpbukx",
	"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_m0Aa55894M7VuyOar8dDtQ_cg594zGX",
	"VITE_SUPABASE_URL": "https://qqujsfrfnviobdmpbukx.supabase.co"
}["VITE_USE_MOCKS"] !== "false";
var TOKEN_KEY = "painease.token";
function getToken() {
	if (typeof window === "undefined") return null;
	return window.localStorage.getItem(TOKEN_KEY);
}
function setToken(token) {
	if (typeof window === "undefined") return;
	if (token) window.localStorage.setItem(TOKEN_KEY, token);
	else window.localStorage.removeItem(TOKEN_KEY);
}
var ApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.status = status;
	}
};
async function request(method, path, body) {
	const headers = { Accept: "application/json" };
	const token = getToken();
	if (token) headers["Authorization"] = `Bearer ${token}`;
	if (body !== void 0) headers["Content-Type"] = "application/json";
	const res = await fetch(`${API_BASE_URL}${path}`, {
		method,
		headers,
		...body === void 0 ? {} : { body: JSON.stringify(body) }
	});
	const json = res.status === 204 ? null : await res.json().catch(() => null);
	if (!res.ok) {
		const msg = json && (json.message || json.error) || `Request failed (${res.status})`;
		throw new ApiError(String(msg), res.status);
	}
	return json && typeof json === "object" && "data" in json ? json.data : json;
}
var api = {
	get: (path) => request("GET", path),
	post: (path, body) => request("POST", path, body),
	put: (path, body) => request("PUT", path, body),
	patch: (path, body) => request("PATCH", path, body),
	delete: (path) => request("DELETE", path)
};
//#endregion
export { api as n, setToken as r, USE_MOCKS as t };
