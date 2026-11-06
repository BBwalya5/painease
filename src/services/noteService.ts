import { api, USE_MOCKS } from "@/lib/api";
import type { ClinicalNote } from "@/types";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getPatientNotes(patientId:string):Promise<ClinicalNote[]> {
  if(!USE_MOCKS)return api.get(`/pro/patients/${patientId}/notes`); // TODO: GET /pro/patients/:id/notes
  await delay();return [{id:"note-1",practitionerId:"practitioner-1",patientId,body:"Continue gentle routine and monitor sleep quality.",createdAt:"2026-10-28T08:00:00.000Z",updatedAt:"2026-10-28T08:00:00.000Z"}];
}
export async function addPatientNote(patientId:string,body:string):Promise<ClinicalNote> {
  if(!USE_MOCKS)return api.post(`/pro/patients/${patientId}/notes`,{body}); // TODO: POST /pro/patients/:id/notes
  await delay();return {id:`note-${Date.now()}`,practitionerId:"practitioner-1",patientId,body,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
}
export async function updatePatientNote(id:string,body:string):Promise<ClinicalNote> {
  if(!USE_MOCKS)return api.put(`/notes/${id}`,{body}); // TODO: PUT /notes/:id
  await delay();return {id,practitionerId:"practitioner-1",patientId:"user-1",body,createdAt:"2026-10-28T08:00:00.000Z",updatedAt:new Date().toISOString()};
}
