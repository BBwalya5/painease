import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { database } from "./index.js";

const directory = path.dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = path.join(directory, "migrations");

async function main() {
  const files = (await fs.readdir(migrationsDirectory))
    .filter((file) => file.endsWith(".sql"))
    .sort();

  await database.connect();
  try {
    for (const file of files) {
      const sql = await fs.readFile(path.join(migrationsDirectory, file), "utf8");
      const statements = sql
        .split(/;\s*(?:\r?\n|$)/)
        .map((statement) => statement.trim())
        .filter(Boolean);

      for (const statement of statements) {
        await database.query(statement);
      }
      console.log(`Applied migration ${file}`);
    }
  } finally {
    await database.disconnect();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
