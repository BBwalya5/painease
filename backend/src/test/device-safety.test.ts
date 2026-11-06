import { describe, expect, it } from "vitest";
import { clampSettings, isSafe } from "@/lib/device-safety";

describe("device safety limits", () => {
  it("caps heat at level 4", () => {
    expect(clampSettings({ heat: 5, vibration: 0, redLight: 0, durationMin: 10 }).heat).toBe(4);
  });
  it("caps vibration and red light at level 5", () => {
    const c = clampSettings({ heat: 0, vibration: 9, redLight: 7, durationMin: 10 });
    expect(c.vibration).toBe(5);
    expect(c.redLight).toBe(5);
  });
  it("caps sessions at 30 minutes", () => {
    expect(clampSettings({ heat: 1, vibration: 2, redLight: 2, durationMin: 60 }).durationMin).toBe(30);
  });
  it("caps sessions at 20 minutes when heat is 3 or more", () => {
    expect(clampSettings({ heat: 3, vibration: 0, redLight: 0, durationMin: 30 }).durationMin).toBe(20);
  });
  it("accepts settings already inside the limits", () => {
    expect(isSafe({ heat: 2, vibration: 3, redLight: 4, durationMin: 25 })).toBe(true);
    expect(isSafe({ heat: 4, vibration: 3, redLight: 4, durationMin: 25 })).toBe(false);
  });
});
