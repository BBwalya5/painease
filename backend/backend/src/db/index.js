import { env } from "../config/env.js";
import { createMySqlDatabase } from "./database.js";

export const database = createMySqlDatabase(env.database);
