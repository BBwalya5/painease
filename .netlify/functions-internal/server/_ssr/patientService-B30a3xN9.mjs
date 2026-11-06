import { n as api, t as USE_MOCKS } from "./api-aVES2gL9.mjs";
import { o as mockPatientDetails, s as mockPatientSummaries } from "./data-B2J0LzkN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patientService-B30a3xN9.js
var delay = () => new Promise((resolve) => setTimeout(resolve, 250));
async function getPatients() {
	if (!USE_MOCKS) return api.get("/pro/patients");
	await delay();
	return mockPatientSummaries;
}
async function getPatientDetail(id) {
	if (!USE_MOCKS) return api.get(`/pro/patients/${id}`);
	await delay();
	return mockPatientDetails[id] ?? mockPatientDetails["user-1"];
}
var mockRequests = [{
	id: "request-1",
	patientId: "user-5",
	patientName: "Natasha Daka",
	patientEmail: "natasha@painease.test",
	message: "I would like your help with my menstrual pain.",
	requestedAt: "2026-11-05T09:20:00.000Z",
	status: "pending"
}, {
	id: "request-2",
	patientId: "user-6",
	patientName: "Esther Mweemba",
	patientEmail: "esther@painease.test",
	message: null,
	requestedAt: "2026-11-04T14:10:00.000Z",
	status: "pending"
}];
var mockFollowUps = [{
	id: "followup-1",
	patientId: "user-1",
	patientName: "Chanda Mwale",
	dueAt: "2026-11-06T09:00:00.000Z",
	reason: "Review home routine and sleep changes",
	completed: false
}, {
	id: "followup-2",
	patientId: "user-3",
	patientName: "Miriam Banda",
	dueAt: "2026-11-07T10:30:00.000Z",
	reason: "Check rising pain trend",
	completed: false
}];
async function getPatientRequests() {
	if (!USE_MOCKS) return api.get("/pro/requests");
	await delay();
	return mockRequests.filter((item) => item.status === "pending");
}
async function respondToPatientRequest(id, accept) {
	if (!USE_MOCKS) return api.post(`/pro/requests/${id}/${accept ? "accept" : "decline"}`);
	await delay();
	const request = mockRequests.find((item) => item.id === id);
	if (!request) throw new Error("Request not found");
	request.status = accept ? "accepted" : "declined";
	return request;
}
async function getFollowUps() {
	if (!USE_MOCKS) return api.get("/pro/follow-ups");
	await delay();
	return mockFollowUps;
}
async function completeFollowUp(id) {
	if (!USE_MOCKS) return api.patch(`/pro/follow-ups/${id}`, { completed: true });
	await delay();
	const item = mockFollowUps.find((entry) => entry.id === id);
	if (!item) throw new Error("Follow-up not found");
	item.completed = true;
	return item;
}
async function sendPatientNudge(patientId, message) {
	if (!USE_MOCKS) await api.post(`/pro/patients/${patientId}/nudges`, { message });
	else await delay();
}
async function scheduleFollowUp(patientId, patientName, dueAt, reason) {
	if (!USE_MOCKS) return api.post(`/pro/patients/${patientId}/follow-ups`, {
		dueAt,
		reason
	});
	await delay();
	const item = {
		id: `followup-${Date.now()}`,
		patientId,
		patientName,
		dueAt,
		reason,
		completed: false
	};
	mockFollowUps.push(item);
	return item;
}
//#endregion
export { getPatients as a, sendPatientNudge as c, getPatientRequests as i, getFollowUps as n, respondToPatientRequest as o, getPatientDetail as r, scheduleFollowUp as s, completeFollowUp as t };
