import type { AuditLog, CheckIn, ConsentLink, Device, DeviceSession, FAQ, PatientDetail, PatientSummary, Practitioner, Routine, User } from "@/types";

const day = (offset: number) => {
  const date = new Date("2026-11-05T08:00:00.000Z");
  date.setUTCDate(date.getUTCDate() - offset);
  return date.toISOString().slice(0, 10);
};

export const mockUsers: User[] = [
  { id:"user-1", email:"user@painease.test", name:"Chanda Mwale", role:"user", age:29, painType:"reproductive", goals:["Reduce monthly discomfort","Improve sleep"], status:"active", onboarded:true, consentAcceptedAt:"2026-08-01T08:00:00.000Z", createdAt:"2026-08-01T08:00:00.000Z", lastActiveAt:"2026-11-05T08:00:00.000Z" },
  { id:"user-2", email:"linda@painease.test", name:"Linda Phiri", role:"user", age:42, painType:"musculoskeletal", goals:["Lower back mobility"], status:"active", onboarded:true, consentAcceptedAt:"2026-09-02T08:00:00.000Z", createdAt:"2026-09-02T08:00:00.000Z", lastActiveAt:"2026-11-04T08:00:00.000Z" },
  { id:"user-3", email:"miriam@painease.test", name:"Miriam Banda", role:"user", age:34, painType:"both", goals:["Manage flare-ups"], status:"active", onboarded:true, consentAcceptedAt:"2026-07-15T08:00:00.000Z", createdAt:"2026-07-15T08:00:00.000Z", lastActiveAt:"2026-10-02T08:00:00.000Z" },
  { id:"user-4", email:"susan@painease.test", name:"Susan Zulu", role:"user", age:51, painType:"musculoskeletal", goals:["Reduce shoulder pain"], status:"suspended", onboarded:true, consentAcceptedAt:"2026-06-01T08:00:00.000Z", createdAt:"2026-06-01T08:00:00.000Z", lastActiveAt:"2026-09-20T08:00:00.000Z" },
  { id:"admin-1", email:"admin@painease.test", name:"Grace Tembo", role:"admin", age:null, painType:null, goals:[], status:"active", onboarded:true, consentAcceptedAt:null, createdAt:"2026-01-01T08:00:00.000Z", lastActiveAt:"2026-11-05T08:00:00.000Z" },
  { id:"pro-1", email:"professional@painease.test", name:"Dr. Mulenga K.", role:"professional", age:null, painType:null, goals:[], status:"active", onboarded:true, consentAcceptedAt:null, createdAt:"2026-02-01T08:00:00.000Z", lastActiveAt:"2026-11-05T08:00:00.000Z" },
  { id:"pro-2", email:"pending@painease.test", name:"Anna Sakala", role:"professional", age:null, painType:null, goals:[], status:"active", onboarded:true, consentAcceptedAt:null, createdAt:"2026-10-20T08:00:00.000Z", lastActiveAt:null },
];

export const mockPractitioners: Practitioner[] = [
  { id:"practitioner-1", userId:"pro-1", name:"Dr. Mulenga K.", email:"professional@painease.test", profession:"Physiotherapist", licenseNumber:"ZAM-HPC-1042", clinic:"Lusaka Wellness Clinic", credentialFileName:"license.pdf", code:"MUL-1042", status:"approved", rejectionReason:null, createdAt:"2026-02-01T08:00:00.000Z", reviewedAt:"2026-02-03T08:00:00.000Z" },
  { id:"practitioner-2", userId:"pro-2", name:"Anna Sakala", email:"pending@painease.test", profession:"Physiotherapist", licenseNumber:"ZAM-HPC-2088", clinic:"Copperbelt Care Centre", credentialFileName:"credential.pdf", code:"SAK-2088", status:"pending", rejectionReason:null, createdAt:"2026-10-20T08:00:00.000Z", reviewedAt:null },
];

export const mockRoutines: Routine[] = [
  { id:"routine-1", name:"Gentle Relief", description:"Low, soothing warmth for everyday discomfort.", painType:"reproductive", isPreset:true, published:true, heat:2, vibration:2, redLight:1, durationMin:15 },
  { id:"routine-2", name:"Deep Relief", description:"Balanced therapy for a persistent sore area.", painType:"musculoskeletal", isPreset:true, published:true, heat:3, vibration:3, redLight:2, durationMin:20 },
  { id:"routine-3", name:"Evening Wind-down", description:"A calm, low-intensity session before rest.", painType:"both", isPreset:true, published:true, heat:2, vibration:1, redLight:2, durationMin:20 },
  { id:"routine-4", name:"Back Mobility", description:"Moderate warmth with gentle vibration.", painType:"musculoskeletal", isPreset:false, published:true, heat:3, vibration:2, redLight:1, durationMin:20 },
  { id:"routine-5", name:"Cycle Comfort", description:"Comfort-focused reproductive cycle routine.", painType:"reproductive", isPreset:false, published:true, heat:3, vibration:2, redLight:2, durationMin:20 },
];

export const mockDevices: Device[] = [
  { id:"device-1", serial:"PE-MAT-00142", type:"therapeutic_mat", status:"active", userId:"user-1", addedAt:"2026-08-04T08:00:00.000Z", lastSyncedAt:"2026-11-05T07:40:00.000Z" },
  { id:"device-2", serial:"PE-BACK-00821", type:"lower_back", status:"active", userId:"user-2", addedAt:"2026-09-05T08:00:00.000Z", lastSyncedAt:"2026-11-04T18:20:00.000Z" },
  { id:"device-3", serial:"PE-KNEE-00418", type:"knee", status:"maintenance", userId:"user-3", addedAt:"2026-08-10T08:00:00.000Z", lastSyncedAt:"2026-10-30T08:00:00.000Z" },
  { id:"device-4", serial:"PE-SHD-00109", type:"shoulder", status:"unassigned", userId:null, addedAt:"2026-10-01T08:00:00.000Z", lastSyncedAt:null },
];

export const mockCheckIns: CheckIn[] = Array.from({ length:30 }, (_, index) => ({
  id:`checkin-${index+1}`, userId:"user-1", date:day(index),
  painLevel:[3,2,3,4,2,3,2,4,5,3,6,5,4,3,5,4,3,2,4,6,5,4,3,2,3,4,2,3,2,3][index],
  bodyAreas:index % 3 === 0 ? ["lower-abdomen"] : ["lower-back","lower-abdomen"],
  frequency:index % 4 === 0 ? "constant" : "on_and_off", mood:index % 2 ? 3 : 4, sleepQuality:index % 3 ? 3 : 4,
  comfort:3+(index%2), activity:3+((index+1)%2), notes:index % 5 === 0 ? "Warmth helped afterwards." : "",
  createdAt:`${day(index)}T08:00:00.000Z`,
}));

export const mockSessions: DeviceSession[] = Array.from({ length:12 }, (_, index) => ({
  id:`session-${index+1}`, userId:"user-1", deviceId:"device-1", routineId:mockRoutines[index%3].id,
  startedAt:`${day(index*2)}T18:${String(index*4%60).padStart(2,"0")}:00.000Z`,
  heat:2+(index%2), vibration:1+(index%3), redLight:1+(index%2), durationMin:15+(index%2)*5, actualMin:14+(index%5),
  painBefore:6-index%3, painAfter:4-index%3,
}));

export const mockConsentLinks: ConsentLink[] = [
  { id:"consent-1", userId:"user-1", practitionerId:"practitioner-1", status:"active", permissions:{painHistory:true,deviceSessions:true,notes:true}, requestedAt:"2026-10-01T08:00:00.000Z", updatedAt:"2026-10-01T09:00:00.000Z" },
  { id:"consent-2", userId:"user-1", practitionerId:"practitioner-2", status:"pending", permissions:{painHistory:true,deviceSessions:false,notes:false}, requestedAt:"2026-11-04T08:00:00.000Z", updatedAt:"2026-11-04T08:00:00.000Z" },
];

export const mockFAQs = [
  { id:"faq-1", question:"How often can I use a PainEase device?", answer:"Follow your device routine and take breaks if skin becomes uncomfortable.", category:"device" as const, published:true },
  { id:"faq-2", question:"When should I seek medical care?", answer:"Seek prompt care for severe, sudden, persistent, or worsening symptoms.", category:"safety" as const, published:true },
  { id:"faq-3", question:"Who can see my data?", answer:"Only practitioners you explicitly link, with the categories you approve.", category:"privacy" as const, published:true },
] satisfies FAQ[];

export const mockAuditLogs: AuditLog[] = [
  { id:"audit-1", actorId:"practitioner-1", actorName:"Dr. Mulenga K.", actorRole:"professional", action:"viewed_pain_history", targetUserId:"user-1", targetName:"Chanda Mwale", detail:"Viewed pain history with consent.", createdAt:"2026-11-05T07:10:00.000Z" },
  { id:"audit-2", actorId:"admin-1", actorName:"Grace Tembo", actorRole:"admin", action:"approved_practitioner", targetUserId:"pro-1", targetName:"Dr. Mulenga K.", detail:"Practitioner license approved.", createdAt:"2026-11-03T09:00:00.000Z" },
];

export const mockPatientSummaries: PatientSummary[] = [
  { patient:{id:"user-1",name:"Chanda Mwale",age:29,painType:"reproductive",email:"user@painease.test"}, link:mockConsentLinks[0], flag:"improving", lastCheckInAt:"2026-11-05T08:00:00.000Z", avgPain7d:3.1, avgPainPrev7d:4.8 },
  { patient:{id:"user-2",name:"Linda Phiri",age:42,painType:"musculoskeletal",email:"linda@painease.test"}, link:{...mockConsentLinks[0],id:"consent-3",userId:"user-2"}, flag:"stable", lastCheckInAt:"2026-11-04T08:00:00.000Z", avgPain7d:5.0, avgPainPrev7d:5.2 },
  { patient:{id:"user-3",name:"Miriam Banda",age:34,painType:"both",email:"miriam@painease.test"}, link:{...mockConsentLinks[0],id:"consent-4",userId:"user-3"}, flag:"pain_rising", lastCheckInAt:"2026-11-01T08:00:00.000Z", avgPain7d:7.1, avgPainPrev7d:5.9 },
  { patient:{id:"user-4",name:"Susan Zulu",age:51,painType:"musculoskeletal",email:"susan@painease.test"}, link:{...mockConsentLinks[0],id:"consent-5",userId:"user-4",status:"revoked"}, flag:"inactive", lastCheckInAt:"2026-09-20T08:00:00.000Z", avgPain7d:null, avgPainPrev7d:null },
];

export const mockPatientDetails: Record<string, PatientDetail> = Object.fromEntries(mockPatientSummaries.map((summary) => [summary.patient.id, {
  ...summary, checkIns:summary.link.permissions.painHistory ? mockCheckIns : null,
  sessions:summary.link.permissions.deviceSessions ? mockSessions : null,
  patientNotes:summary.link.permissions.notes ? mockCheckIns.slice(0,6).map((item) => ({date:item.date,notes:item.notes||"No additional notes."})) : null,
}]));
