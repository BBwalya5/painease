import { i as __toESM } from "../_runtime.mjs";
import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { r as mockConsentLinks } from "./data-B2J0LzkN.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/provider-B5M8pUm-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getConsentLinks() {
	if (!USE_MOCKS) return api.get("/me/consents");
	await delay();
	return mockConsentLinks;
}
async function requestConsent(codeOrEmail) {
	if (!USE_MOCKS) return api.post("/consents", { codeOrEmail });
	await delay();
	return {
		...mockConsentLinks[1],
		id: `consent-${Date.now()}`,
		practitionerId: `code:${codeOrEmail}`
	};
}
async function updateConsent(id, permissions) {
	if (!USE_MOCKS) return api.patch(`/consents/${id}`, { permissions });
	await delay();
	return {
		...mockConsentLinks.find((item) => item.id === id),
		permissions,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function revokeConsent(id) {
	if (!USE_MOCKS) return api.post(`/consents/${id}/revoke`);
	await delay();
	return {
		...mockConsentLinks.find((item) => item.id === id),
		status: "revoked"
	};
}
function Provider() {
	const qc = useQueryClient();
	const query = useQuery({
		queryKey: ["consents"],
		queryFn: getConsentLinks
	});
	const [code, setCode] = (0, import_react.useState)("");
	const request = useMutation({
		mutationFn: () => requestConsent(code),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["consents"] })
	});
	const update = useMutation({
		mutationFn: (args) => updateConsent(args.id, args.permissions),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["consents"] })
	});
	const revoke = useMutation({
		mutationFn: (id) => revokeConsent(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["consents"] })
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "card text-muted-foreground",
		children: "Loading practitioner access…"
	});
	if (query.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "card text-destructive",
		children: "Couldn't load sharing settings."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-semibold text-teal",
			children: "Share with practitioner"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mb-5 text-3xl font-bold text-deep",
			children: "Practitioner access"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold",
				children: "Link a practitioner"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "min-w-0 flex-1 rounded-xl border px-3",
					placeholder: "Practitioner code or email",
					value: code,
					onChange: (e) => setCode(e.target.value)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn-primary",
					disabled: !code || request.isPending,
					onClick: () => request.mutate(),
					children: "Send request"
				})]
			})]
		}),
		query.data?.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 card text-muted-foreground",
			children: "No practitioner links yet."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: query.data?.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-deep",
						children: "Linked practitioner"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs capitalize text-muted-foreground",
						children: link.status
					})] }), link.status === "active" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-sm font-semibold text-destructive",
						onClick: () => revoke.mutate(link.id),
						children: "Revoke access"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: [
						"painHistory",
						"deviceSessions",
						"notes"
					].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm capitalize",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: link.permissions[key],
							disabled: link.status === "revoked",
							onChange: (e) => update.mutate({
								id: link.id,
								permissions: {
									...link.permissions,
									[key]: e.target.checked
								}
							})
						}), key.replace(/([A-Z])/g, " $1")]
					}, key))
				})]
			}, link.id))
		})
	] });
}
//#endregion
export { Provider as component };
