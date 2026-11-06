import { api, USE_MOCKS } from "@/lib/api";
import type { AssignedRoutine, Routine } from "@/types";
import { mockRoutines } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getRoutines():Promise<Routine[]> {
  if(!USE_MOCKS)return api.get("/routines"); // TODO: GET /routines
  await delay();return mockRoutines;
}
export async function getAssignedRoutines():Promise<AssignedRoutine[]> {
  if(!USE_MOCKS)return api.get("/me/assigned-routines"); // TODO: GET /me/assigned-routines
  await delay();return [{id:"assigned-1",practitionerId:"practitioner-1",patientId:"user-1",routineId:"routine-1",heat:2,vibration:2,redLight:1,durationMin:15,timesPerWeek:4,instructions:"Use after daily check-in when comfortable.",assignedAt:"2026-11-01T08:00:00.000Z"}];
}

export async function assignRoutine(input: {
  patientId: string;
  routineId: string;
  heat: number;
  vibration: number;
  redLight: number;
  durationMin: number;
  timesPerWeek: number;
  instructions: string;
}): Promise<AssignedRoutine> {
  if (!USE_MOCKS) return api.post(`/pro/patients/${input.patientId}/routines`, input); // TODO: POST /pro/patients/:id/routines
  await delay();
  return {
    id: `assigned-${Date.now()}`,
    practitionerId: "practitioner-1",
    ...input,
    assignedAt: new Date().toISOString(),
  };
}
