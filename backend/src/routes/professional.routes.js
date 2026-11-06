import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import {
  getProfessionalProfile,
  saveProfessionalProfile,
  getMyRoles,
  listGuideMessages,
  clearGuideMessages,
  saveGuideMessage,
} from "../controllers/role.controller.js";

export const professionalRouter = Router();

professionalRouter.use(requireAuth);
professionalRouter.get("/roles/me", getMyRoles);
professionalRouter.get("/professional-profile", getProfessionalProfile);
professionalRouter.put("/professional-profile", saveProfessionalProfile);
professionalRouter.get("/guide-messages", listGuideMessages);
professionalRouter.delete("/guide-messages", clearGuideMessages);
professionalRouter.post("/guide-messages", saveGuideMessage);
