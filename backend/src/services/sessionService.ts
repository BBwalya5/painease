import { api, USE_MOCKS } from "@/lib/api";
import type { DeviceSession } from "@/types";
import { mockSessions } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getSessions():Promise<DeviceSession[]> { if(!USE_MOCKS)return api.get("/me/sessions"); await delay();return mockSessions; } // TODO: GET /me/sessions
