// Core entity types. Keep these simple — the Node backend models are aligned to them.
// Dates are ISO strings (e.g. "2026-11-05T08:00:00.000Z"); day-only dates are "YYYY-MM-DD".

export type Role = "user" | "professional" | "admin";
export type PainType = "reproductive" | "musculoskeletal" | "both";
export type AccountStatus = "active" | "suspended";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  age: number | null;
  painType: PainType | null;
  goals: string[];
  status: AccountStatus;
  onboarded: boolean;
  consentAcceptedAt: string | null;
  createdAt: string;
  lastActiveAt: string | null;
}

export type PractitionerStatus = "pending" | "approved" | "rejected";

export interface Practitioner {
  id: string;
  userId: string;
  name: string;
  email: string;
  profession: string;
  licenseNumber: string;
  clinic: string;
  credentialFileName: string | null;
  /** Short code patients type to send a link request. */
  code: string;
  status: PractitionerStatus;
  rejectionReason: string | null;
  createdAt: string;
  reviewedAt: string | null;
}

export type DeviceType = "therapeutic_mat" | "lower_back" | "shoulder" | "knee" | "ankle";
export type DeviceStatus = "active" | "inactive" | "maintenance" | "unassigned";

export interface Device {
  id: string;
  serial: string;
  type: DeviceType;
  status: DeviceStatus;
  userId: string | null;
  addedAt: string;
  lastSyncedAt: string | null;
}

/** Therapy levels are 0–5. */
export interface TherapySettings {
  heat: number;
  vibration: number;
  redLight: number;
  durationMin: number;
}

export interface DeviceSession extends TherapySettings {
  id: string;
  userId: string;
  deviceId: string;
  routineId: string | null;
  startedAt: string;
  /** Actual minutes run (may be shorter than durationMin if stopped early). */
  actualMin: number;
  painBefore: number | null;
  painAfter: number | null;
}

export type PainFrequency = "once" | "on_and_off" | "constant";

export interface CheckIn {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  painLevel: number; // 0–10
  bodyAreas: string[]; // body-map area ids, see src/lib/body-areas.ts
  frequency: PainFrequency;
  mood: number; // 1–5
  sleepQuality: number; // 1–5
  comfort: number; // 1–5 self-reported comfort
  activity: number; // 1–5 self-reported activity level
  notes: string;
  createdAt: string;
}

export interface Routine extends TherapySettings {
  id: string;
  name: string;
  description: string;
  painType: PainType;
  isPreset: boolean;
  published: boolean;
}

export type ConsentStatus = "pending" | "active" | "revoked";

export interface ConsentPermissions {
  painHistory: boolean;
  deviceSessions: boolean;
  notes: boolean;
}

export interface ConsentLink {
  id: string;
  userId: string;
  practitionerId: string;
  status: ConsentStatus;
  permissions: ConsentPermissions;
  requestedAt: string;
  updatedAt: string;
}

export interface ClinicalNote {
  id: string;
  practitionerId: string;
  patientId: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssignedRoutine extends TherapySettings {
  id: string;
  practitionerId: string;
  patientId: string;
  routineId: string;
  timesPerWeek: number;
  instructions: string;
  assignedAt: string;
}

export interface AuditLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: Role;
  action: string; // e.g. "viewed_pain_history", "approved_practitioner"
  targetUserId: string | null;
  targetName: string | null;
  detail: string;
  createdAt: string;
}

export type FAQCategory = "general" | "device" | "safety" | "privacy";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  published: boolean;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  audience: "all" | "user" | "professional";
  published: boolean;
  createdAt: string;
}

export interface CycleEntry {
  id: string;
  userId: string;
  startDate: string;
  endDate: string | null;
  flow: "light" | "medium" | "heavy";
  symptoms: string[];
}

// ---- Derived / view types returned by the API ----

export interface AuthSession {
  token: string;
  user: User;
  practitioner: Practitioner | null;
}

export type PatientFlag = "improving" | "stable" | "pain_rising" | "inactive";

export interface PatientSummary {
  patient: Pick<User, "id" | "name" | "age" | "painType" | "email">;
  link: ConsentLink;
  flag: PatientFlag;
  lastCheckInAt: string | null;
  avgPain7d: number | null;
  avgPainPrev7d: number | null;
}

export interface PatientDetail extends PatientSummary {
  /** Only present when the patient allowed the category. */
  checkIns: CheckIn[] | null;
  sessions: DeviceSession[] | null;
  patientNotes: { date: string; notes: string }[] | null;
}

export interface PatientRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  message: string | null;
  requestedAt: string;
  status: "pending" | "accepted" | "declined";
}

export interface FollowUp {
  id: string;
  patientId: string;
  patientName: string;
  dueAt: string;
  reason: string;
  completed: boolean;
}
