import { api, USE_MOCKS } from "@/lib/api";
import type { Practitioner } from "@/types";
import { mockPractitioners } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getMyPractitioner():Promise<Practitioner|null> {
  if(!USE_MOCKS)return api.get("/professional-profile"); // TODO: GET /professional-profile
  await delay();return mockPractitioners[0];
}
export async function registerProfessional(input:Partial<Practitioner>):Promise<Practitioner> {
  if(!USE_MOCKS)return api.post("/auth/register-professional",input); // TODO: POST /auth/register-professional
  await delay();return {...mockPractitioners[1],...input,status:"pending"};
}
