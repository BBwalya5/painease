import { api, USE_MOCKS } from "@/lib/api";
import type { CycleEntry } from "@/types";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getCycleEntries():Promise<CycleEntry[]> {
  if(!USE_MOCKS)return api.get("/me/cycles"); // TODO: GET /me/cycles
  await delay();return [{id:"cycle-1",userId:"user-1",startDate:"2026-10-12",endDate:"2026-10-17",flow:"medium",symptoms:["cramps","fatigue"]}];
}
export async function addCycleEntry(input:Omit<CycleEntry,"id"|"userId">):Promise<CycleEntry> {
  if(!USE_MOCKS)return api.post("/me/cycles",input); // TODO: POST /me/cycles
  await delay();return {...input,id:`cycle-${Date.now()}`,userId:"user-1"};
}
