import assert from "node:assert/strict";
import { test } from "node:test";
import { getHealthStatus } from "../src/services/health.service.js";

test("health status reports an ok service", () => {
  const result = getHealthStatus();

  assert.equal(result.status, "ok");
  assert.equal(result.service, "painease-backend");
  assert.equal(typeof result.timestamp, "string");
});
