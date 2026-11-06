import { app } from "./app.js";
import { env } from "./config/env.js";
import { database } from "./db/index.js";

const server = app.listen(env.port, () => {
  console.log(`PainEase API listening on port ${env.port}`);
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down gracefully.`);

  server.close(async (error) => {
    if (error) {
      console.error("Graceful shutdown failed", error);
      process.exit(1);
    }

    try {
      await database.disconnect();
      process.exit(0);
    } catch (databaseError) {
      console.error("Database shutdown failed", databaseError);
      process.exit(1);
    }
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
