import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "../config/env.js";
import { database } from "./index.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const seedFile = path.join(directory, "seeds", "002_demo_mysql.sql");

async function main() {
  if (env.isProduction && process.env.SEED_DEMO_DATA !== "true") {
    throw new Error("Demo seeding is disabled in production. Set SEED_DEMO_DATA=true only if this is intentional.");
  }

  const sql = await fs.readFile(seedFile, "utf8");
  const statements = sql
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  await database.connect();
  try {
    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    for (const statement of statements) {
      await database.query(statement);
    }
    await database.query("SET FOREIGN_KEY_CHECKS = 1");
  } catch (error) {
    await database.query("SET FOREIGN_KEY_CHECKS = 1").catch(() => {});
    throw error;
  } finally {
    await database.disconnect();
  }

  console.log("Demo data seeded successfully.");
  console.log("Admin: admin@painease.test / Admin123");
  console.log("Professional: professional@painease.test / Professional123");
  console.log("User: user@painease.test / User123");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
