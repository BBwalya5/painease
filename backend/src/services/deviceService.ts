import { api, USE_MOCKS } from "@/lib/api";
import type { Device, DeviceSession } from "@/types";
import { mockDevices, mockSessions } from "@/mocks/data";
const delay = () => new Promise((resolve) => setTimeout(resolve, 250));
export async function getMyDevices(): Promise<Device[]> {
  if (!USE_MOCKS) return api.get("/me/devices"); // TODO: GET /me/devices
  await delay(); return mockDevices.filter((item)=>item.userId==="user-1");
}
export async function addDevice(input: Omit<Device,"id"|"addedAt"|"lastSyncedAt"|"userId">): Promise<Device> {
  if (!USE_MOCKS) return api.post("/me/devices", input); // TODO: POST /me/devices
  await delay(); return {...input,id:`device-${Date.now()}`,userId:"user-1",addedAt:new Date().toISOString(),lastSyncedAt:null};
}
export async function getMySessions(): Promise<DeviceSession[]> {
  if (!USE_MOCKS) return api.get("/me/sessions"); // TODO: GET /me/sessions
  await delay(); return mockSessions;
}
export async function logSession(input: Omit<DeviceSession,"id"|"userId">): Promise<DeviceSession> {
  if (!USE_MOCKS) return api.post("/sessions", input); // TODO: POST /sessions
  await delay(); return {...input,id:`session-${Date.now()}`,userId:"user-1"};
}
