import type { TherapySettings } from "@/types";

/** Safe operating limits for PainEase wearables. Levels are 0–5. */
export const DEVICE_LIMITS = {
  maxLevel: 5,
  /** Heat above this level is not allowed. */
  maxHeat: 4,
  maxDurationMin: 30,
  /** When heat is at or above this level, sessions are capped shorter. */
  highHeatLevel: 3,
  highHeatMaxDurationMin: 20,
  minDurationMin: 5,
} as const;

export const SAFETY_NOTICE =
  "Keep heat at a comfortable warmth and never sleep with the device on. Stop if your skin becomes red, painful or numb. Do not use over broken skin, during pregnancy without medical advice, or if you have reduced feeling in the area.";

const clampLevel = (n: number, max: number) => Math.max(0, Math.min(max, Math.round(n)));

export function maxDurationFor(heat: number): number {
  return heat >= DEVICE_LIMITS.highHeatLevel ? DEVICE_LIMITS.highHeatMaxDurationMin : DEVICE_LIMITS.maxDurationMin;
}

/** Returns settings forced inside the safe limits. */
export function clampSettings(s: TherapySettings): TherapySettings {
  const heat = clampLevel(s.heat, DEVICE_LIMITS.maxHeat);
  return {
    heat,
    vibration: clampLevel(s.vibration, DEVICE_LIMITS.maxLevel),
    redLight: clampLevel(s.redLight, DEVICE_LIMITS.maxLevel),
    durationMin: Math.max(DEVICE_LIMITS.minDurationMin, Math.min(maxDurationFor(heat), Math.round(s.durationMin))),
  };
}

export function isSafe(s: TherapySettings): boolean {
  const c = clampSettings(s);
  return c.heat === s.heat && c.vibration === s.vibration && c.redLight === s.redLight && c.durationMin === s.durationMin;
}
