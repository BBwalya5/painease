import { describe, expect, it } from "vitest";
import { routeRedirect } from "@/lib/route-access";

describe("Signed-out page access", () => {
  it("opens sign-in by default", () => expect(routeRedirect("/", null)).toBe("/auth"));
  it.each(["/track", "/profile", "/guide", "/insights", "/journey", "/library", "/conditions", "/conditions/endometriosis", "/provider", "/relief", "/womens", "/admin", "/admin/users", "/professional", "/professional/patients/user-1", "/unknown"])("blocks %s without a session", (path) => {
    expect(routeRedirect(path, null)).toBe("/auth");
  });
  it("keeps sign-in accessible", () => expect(routeRedirect("/auth", null)).toBeNull());
  it("keeps account recovery accessible", () => expect(routeRedirect("/reset-password", null)).toBeNull());
});

describe("Separate role modules", () => {
  it.each(["/admin", "/professional"])("blocks user access to %s", path => expect(routeRedirect(path, "user")).toBe("/track"));
  it.each(["/", "/track", "/professional"])("blocks admin access to %s", path => expect(routeRedirect(path, "admin")).toBe("/admin"));
  it.each(["/", "/track", "/admin"])("blocks professional access to %s", path => expect(routeRedirect(path, "professional")).toBe("/professional"));
  it.each(["user", "professional", "admin"] as const)("allows the %s module", role => {
    const path = role === "user" ? "/track" : `/${role}`;
    expect(routeRedirect(path, role)).toBeNull();
  });
});