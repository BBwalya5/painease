import { api, USE_MOCKS } from "@/lib/api";
import type { FollowUp, PatientDetail, PatientRequest, PatientSummary } from "@/types";
import { mockPatientDetails, mockPatientSummaries } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getPatients():Promise<PatientSummary[]> {
  if(!USE_MOCKS)return api.get("/pro/patients"); // TODO: GET /pro/patients
  await delay();return mockPatientSummaries;
}
export async function getPatientDetail(id:string):Promise<PatientDetail> {
  if(!USE_MOCKS)return api.get(`/pro/patients/${id}`); // TODO: GET /pro/patients/:id
  await delay();return mockPatientDetails[id]??mockPatientDetails["user-1"];
}

const mockRequests: PatientRequest[] = [
  { id:"request-1",patientId:"user-5",patientName:"Natasha Daka",patientEmail:"natasha@painease.test",message:"I would like your help with my menstrual pain.",requestedAt:"2026-11-05T09:20:00.000Z",status:"pending" },
  { id:"request-2",patientId:"user-6",patientName:"Esther Mweemba",patientEmail:"esther@painease.test",message:null,requestedAt:"2026-11-04T14:10:00.000Z",status:"pending" },
];
const mockFollowUps: FollowUp[] = [
  { id:"followup-1",patientId:"user-1",patientName:"Chanda Mwale",dueAt:"2026-11-06T09:00:00.000Z",reason:"Review home routine and sleep changes",completed:false },
  { id:"followup-2",patientId:"user-3",patientName:"Miriam Banda",dueAt:"2026-11-07T10:30:00.000Z",reason:"Check rising pain trend",completed:false },
];

export async function getPatientRequests(): Promise<PatientRequest[]> {
  if (!USE_MOCKS) return api.get("/pro/requests"); // TODO: GET /pro/requests
  await delay(); return mockRequests.filter((item) => item.status === "pending");
}
export async function respondToPatientRequest(id:string, accept:boolean): Promise<PatientRequest> {
  if (!USE_MOCKS) return api.post(`/pro/requests/${id}/${accept ? "accept" : "decline"}`); // TODO: POST /pro/requests/:id/accept or decline
  await delay();
  const request = mockRequests.find((item) => item.id === id);
  if (!request) throw new Error("Request not found");
  request.status = accept ? "accepted" : "declined";
  return request;
}
export async function getFollowUps(): Promise<FollowUp[]> {
  if (!USE_MOCKS) return api.get("/pro/follow-ups"); // TODO: GET /pro/follow-ups
  await delay(); return mockFollowUps;
}
export async function completeFollowUp(id:string): Promise<FollowUp> {
  if (!USE_MOCKS) return api.patch(`/pro/follow-ups/${id}`, { completed:true }); // TODO: PATCH /pro/follow-ups/:id
  await delay();
  const item = mockFollowUps.find((entry) => entry.id === id);
  if (!item) throw new Error("Follow-up not found");
  item.completed = true;
  return item;
}
export async function sendPatientNudge(patientId:string, message:string): Promise<void> {
  if (!USE_MOCKS) await api.post(`/pro/patients/${patientId}/nudges`, { message }); // TODO: POST /pro/patients/:id/nudges
  else { await delay(); }
}

export async function scheduleFollowUp(patientId:string, patientName:string, dueAt:string, reason:string): Promise<FollowUp> {
  if (!USE_MOCKS) return api.post(`/pro/patients/${patientId}/follow-ups`, { dueAt, reason }); // TODO: POST /pro/patients/:id/follow-ups
  await delay();
  const item: FollowUp = { id:`followup-${Date.now()}`, patientId, patientName, dueAt, reason, completed:false };
  mockFollowUps.push(item);
  return item;
}
