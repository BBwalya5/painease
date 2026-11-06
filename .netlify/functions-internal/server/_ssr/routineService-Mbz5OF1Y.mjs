import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { l as mockRoutines } from "./data-B2J0LzkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routineService-Mbz5OF1Y.js
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getRoutines() {
	if (!USE_MOCKS) return api.get("/routines");
	await delay();
	return mockRoutines;
}
async function getAssignedRoutines() {
	if (!USE_MOCKS) return api.get("/me/assigned-routines");
	await delay();
	return [{
		id: "assigned-1",
		practitionerId: "practitioner-1",
		patientId: "user-1",
		routineId: "routine-1",
		heat: 2,
		vibration: 2,
		redLight: 1,
		durationMin: 15,
		timesPerWeek: 4,
		instructions: "Use after daily check-in when comfortable.",
		assignedAt: "2026-11-01T08:00:00.000Z"
	}];
}
async function assignRoutine(input) {
	if (!USE_MOCKS) return api.post(`/pro/patients/${input.patientId}/routines`, input);
	await delay();
	return {
		id: `assigned-${Date.now()}`,
		practitionerId: "practitioner-1",
		...input,
		assignedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
//#endregion
export { getAssignedRoutines as n, getRoutines as r, assignRoutine as t };
