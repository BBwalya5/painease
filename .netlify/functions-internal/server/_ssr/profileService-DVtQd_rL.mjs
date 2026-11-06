import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { d as mockUsers } from "./data-B2J0LzkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profileService-DVtQd_rL.js
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getProfile() {
	if (!USE_MOCKS) return api.get("/me/profile");
	await delay();
	return mockUsers[0];
}
async function updateProfile(input) {
	if (!USE_MOCKS) return api.put("/me/profile", input);
	await delay();
	return {
		...mockUsers[0],
		...input
	};
}
//#endregion
export { updateProfile as n, getProfile as t };
