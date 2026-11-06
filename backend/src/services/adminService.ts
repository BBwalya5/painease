import { api, USE_MOCKS } from "@/lib/api";
import type { AuditLog, Device, FAQ, Practitioner, Routine, User } from "@/types";
import { mockAuditLogs, mockDevices, mockFAQs, mockPractitioners, mockRoutines, mockUsers } from "@/mocks/data";
const delay=()=>new Promise((resolve)=>setTimeout(resolve,250));
export async function getAdminStats(){ if(!USE_MOCKS)return api.get("/admin/stats"); await delay(); return {totalUsers:mockUsers.filter((u)=>u.role==="user").length,activeThisWeek:3,checkIns:30,sessions:12,devices:mockDevices.length,pendingApprovals:mockPractitioners.filter((p)=>p.status==="pending").length}; } // TODO: GET /admin/stats
export async function getAdminUsers():Promise<User[]> { if(!USE_MOCKS)return api.get("/admin/users"); await delay();return mockUsers; } // TODO: GET /admin/users
export async function setUserStatus(id:string,status:"active"|"suspended"):Promise<User> { if(!USE_MOCKS)return api.patch(`/admin/users/${id}/status`,{status}); await delay();return {...mockUsers.find((u)=>u.id===id)!,status}; } // TODO: PATCH /admin/users/:id/status
export async function getPractitioners():Promise<Practitioner[]> { if(!USE_MOCKS)return api.get("/admin/practitioners"); await delay();return mockPractitioners; } // TODO: GET /admin/practitioners
export async function reviewPractitioner(id:string,approved:boolean,reason?:string):Promise<Practitioner> { if(!USE_MOCKS)return api.post(`/admin/practitioners/${id}/${approved?"approve":"reject"}`,reason?{reason}:{ }); await delay();return {...mockPractitioners.find((p)=>p.id===id)!,status:approved?"approved":"rejected",rejectionReason:approved?null:reason??"Review declined"}; } // TODO approve/reject endpoints
export async function getAdminDevices():Promise<Device[]> { if(!USE_MOCKS)return api.get("/admin/devices"); await delay();return mockDevices; } // TODO: GET /admin/devices
export async function getRoutinesAdmin():Promise<Routine[]> { if(!USE_MOCKS)return api.get("/admin/routines"); await delay();return mockRoutines; } // TODO: GET /admin/routines
export async function getFAQs():Promise<FAQ[]> { if(!USE_MOCKS)return api.get("/admin/faqs"); await delay();return mockFAQs; } // TODO: GET /admin/faqs
export async function getAuditLogs():Promise<AuditLog[]> { if(!USE_MOCKS)return api.get("/admin/audit-logs"); await delay();return mockAuditLogs; } // TODO: GET /admin/audit-logs
