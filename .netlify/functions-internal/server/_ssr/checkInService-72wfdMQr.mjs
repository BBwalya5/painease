import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { n as mockCheckIns } from "./data-B2J0LzkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkInService-72wfdMQr.js
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getCheckIns() {
	if (!USE_MOCKS) return api.get("/me/checkins");
	await delay();
	return mockCheckIns;
}
async function createCheckIn(input) {
	if (!USE_MOCKS) return api.post("/checkins", input);
	await delay();
	return {
		...input,
		id: `checkin-${Date.now()}`,
		userId: "user-1",
		createdAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
//#endregion
export { getCheckIns as n, createCheckIn as t };
