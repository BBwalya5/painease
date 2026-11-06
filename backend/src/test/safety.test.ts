import { describe, expect, it } from "vitest";
import { assessSafety, blankAnswers, type SafetyAnswers } from "@/lib/safety";

const a = (patch: Partial<SafetyAnswers>): SafetyAnswers => ({ ...blankAnswers, ...patch });

describe("Ease Safety pathway", () => {
  it("chest discomfort or trouble breathing is always urgent", () => {
    expect(assessSafety(a({ chestOrBreathing: true })).level).toBe("urgent");
  });

  it("nerve warnings are urgent", () => {
    expect(assessSafety(a({ nerveWarnings: true })).level).toBe("urgent");
  });

  it("sudden severe pain with fainting, fever or vomiting is urgent", () => {
    expect(assessSafety(a({ suddenSevere: true, faintFeverVomit: true })).level).toBe("urgent");
  });

  it("sudden severe pain with possible pregnancy is urgent", () => {
    expect(assessSafety(a({ suddenSevere: true, possiblyPregnant: true })).level).toBe("urgent");
  });

  it("sudden severe pain alone is prompt, not urgent", () => {
    expect(assessSafety(a({ suddenSevere: true })).level).toBe("prompt");
  });

  it("a hot, red, swollen joint is prompt", () => {
    expect(assessSafety(a({ jointWarnings: true })).level).toBe("prompt");
  });

  it("new, worsening or long-lasting symptoms lead to a routine assessment", () => {
    const r = assessSafety(a({ persistent: true }));
    expect(r.level).toBe("prompt");
    expect(r.title).toContain("routine assessment");
  });

  it("no warning signs means self-care is reasonable", () => {
    expect(assessSafety(a({})).level).toBe("routine");
  });

  it("every result includes at least one next step", () => {
    for (const patch of [{}, { chestOrBreathing: true }, { suddenSevere: true, possiblyPregnant: true }, { persistent: true }]) {
      expect(assessSafety(a(patch)).steps.length).toBeGreaterThan(0);
    }
  });
});
