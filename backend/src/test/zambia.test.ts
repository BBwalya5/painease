import { describe, expect, it } from "vitest";
import { zambiaDistricts, zambiaProvinces } from "@/lib/zambia";

describe("Zambia locations", () => {
  it("lists all ten provinces", () => {
    expect(zambiaProvinces.sort()).toEqual(
      ["Central", "Copperbelt", "Eastern", "Luapula", "Lusaka", "Muchinga", "North-Western", "Northern", "Southern", "Western"],
    );
  });
  it("has 116 unique districts", () => {
    const all = Object.values(zambiaDistricts).flat();
    expect(all.length).toBe(116);
    expect(new Set(all).size).toBe(116);
  });
});
