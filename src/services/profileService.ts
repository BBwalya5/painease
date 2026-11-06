import { api, USE_MOCKS } from "@/lib/api";
import type { User } from "@/types";
import { mockUsers } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getProfile():Promise<User> {
  if(!USE_MOCKS)return api.get("/me/profile"); // TODO: GET /me/profile
  await delay();return mockUsers[0];
}
export async function updateProfile(input:Partial<User>):Promise<User> {
  if(!USE_MOCKS)return api.put("/me/profile",input); // TODO: PUT /me/profile
  await delay();return {...mockUsers[0],...input};
}
export async function acceptConsent():Promise<void> {
  if(!USE_MOCKS) await api.post("/me/consent"); // TODO: POST /me/consent
  else await delay();
}
