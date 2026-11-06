import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "../controllers/account.controller.js";
import { listEntries, createEntry, deleteEntry, deleteAllEntries } from "../controllers/pain.controller.js";

export const accountRouter = Router();

accountRouter.use(requireAuth);
accountRouter.get("/profile", getProfile);
accountRouter.put("/profile", updateProfile);
accountRouter.get("/pain-entries", listEntries);
accountRouter.post("/pain-entries", createEntry);
accountRouter.delete("/pain-entries", deleteAllEntries);
accountRouter.delete("/pain-entries/:id", deleteEntry);
