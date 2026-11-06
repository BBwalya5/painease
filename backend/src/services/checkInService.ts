import { api, USE_MOCKS } from "@/lib/api";
import type { CheckIn } from "@/types";
import { mockCheckIns } from "@/mocks/data";
const delay = () => new Promise((resolve) => setTimeout(resolve, 250));
export async function getCheckIns(): Promise<CheckIn[]> {
  if (!USE_MOCKS) return api.get("/me/checkins"); // TODO: GET /me/checkins
  await delay(); return mockCheckIns;
}
export async function createCheckIn(input: Omit<CheckIn,"id"|"createdAt"|"userId">): Promise<CheckIn> {
  if (!USE_MOCKS) return api.post("/checkins", input); // TODO: POST /checkins
  await delay(); return {...input,id:`checkin-${Date.now()}`,userId:"user-1",createdAt:new Date().toISOString()};
}
