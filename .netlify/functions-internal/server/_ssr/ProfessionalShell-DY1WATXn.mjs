import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useSessionUser } from "./SignOutButton-DZMCaJSo.mjs";
import { r as PageHeader } from "./AppShell-CREoi6Ey.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProfessionalShell-DY1WATXn.js
var import_jsx_runtime = require_jsx_runtime();
/** Shared query for the signed-in professional's own profile. */
function useMyProProfile() {
	const { session, ready } = useSessionUser();
	return {
		data: session?.practitioner ? {
			full_name: session.practitioner.name,
			profession: session.practitioner.profession,
			license_number: session.practitioner.licenseNumber,
			licensing_body: null,
			facility: session.practitioner.clinic,
			province: "Lusaka",
			district: "Lusaka",
			services: ["Pain support"],
			bio: null,
			status: session.practitioner.status,
			review_note: session.practitioner.rejectionReason
		} : null,
		isLoading: !ready,
		isSuccess: ready,
		isError: false,
		error: null
	};
}
function ProfessionalPageShell({ title, sub, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "For healthcare professionals",
		title,
		sub
	}), children] });
}
//#endregion
export { useMyProProfile as n, ProfessionalPageShell as t };
