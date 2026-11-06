import type { DeviceType, PainType, PatientFlag, PainFrequency } from "@/types";

export const DEVICE_TYPE_LABEL: Record<DeviceType, string> = {
  therapeutic_mat: "Therapeutic Mat",
  lower_back: "Lower Back",
  shoulder: "Shoulder",
  knee: "Knee",
  ankle: "Ankle",
};
export const DEVICE_TYPES = Object.keys(DEVICE_TYPE_LABEL) as DeviceType[];

export const PAIN_TYPE_LABEL: Record<PainType, string> = {
  reproductive: "Reproductive",
  musculoskeletal: "Musculoskeletal",
  both: "Both",
};

export const FLAG_LABEL: Record<PatientFlag, string> = {
  improving: "Improving",
  stable: "Stable",
  pain_rising: "Pain rising",
  inactive: "Inactive",
};

export const FREQUENCY_LABEL: Record<PainFrequency, string> = {
  once: "Once today",
  on_and_off: "On and off",
  constant: "Constant",
};

export const formatDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";
export const formatDateTime = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
