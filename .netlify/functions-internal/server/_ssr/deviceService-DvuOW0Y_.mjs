import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { i as mockDevices, u as mockSessions } from "./data-B2J0LzkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deviceService-DvuOW0Y_.js
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getMyDevices() {
	if (!USE_MOCKS) return api.get("/me/devices");
	await delay();
	return mockDevices.filter((item) => item.userId === "user-1");
}
async function getMySessions() {
	if (!USE_MOCKS) return api.get("/me/sessions");
	await delay();
	return mockSessions;
}
async function logSession(input) {
	if (!USE_MOCKS) return api.post("/sessions", input);
	await delay();
	return {
		...input,
		id: `session-${Date.now()}`,
		userId: "user-1"
	};
}
//#endregion
export { getMySessions as n, logSession as r, getMyDevices as t };
