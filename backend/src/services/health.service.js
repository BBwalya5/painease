export function getHealthStatus() {
  return {
    status: "ok",
    service: "painease-backend",
    timestamp: new Date().toISOString(),
  };
}
