import { describe, expect, it } from "vitest";
import { regionsForView, regionLabel } from "@/lib/body-regions";

describe("body map sides", () => {
  it("shows the person's left knee on the viewer's right in front view", () => {
    const knee = regionsForView("front").find((r) => r.key === "knee:left")!;
    expect(knee.shape.kind === "ellipse" && knee.shape.cx > 60).toBe(true);
  });
  it("shows the person's left knee on the viewer's left in back view", () => {
    const knee = regionsForView("back").find((r) => r.key === "knee:left")!;
    expect(knee.shape.kind === "ellipse" && knee.shape.cx < 60).toBe(true);
  });
  it("keeps the same region key across views so selections survive switching", () => {
    expect(regionsForView("back").some((r) => r.key === "knee:left")).toBe(true);
    expect(regionLabel("knee:left")).toBe("Left knee");
  });
});
