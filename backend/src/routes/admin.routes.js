import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth.middleware.js";
import {
  stats,
  listUsers,
  setRole,
  listProfessionals,
  reviewProfessional,
  listArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  listFacilities,
  createFacility,
  verifyFacility,
  listAudit,
} from "../controllers/admin.controller.js";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));
adminRouter.get("/stats", stats);
adminRouter.get("/users", listUsers);
adminRouter.put("/users/:userId/role", setRole);
adminRouter.get("/professionals", listProfessionals);
adminRouter.put("/professionals/:userId/review", reviewProfessional);
adminRouter.get("/articles", listArticles);
adminRouter.post("/articles", createArticle);
adminRouter.put("/articles/:id", updateArticle);
adminRouter.delete("/articles/:id", deleteArticle);
adminRouter.get("/facilities", listFacilities);
adminRouter.post("/facilities", createFacility);
adminRouter.put("/facilities/:id/verify", verifyFacility);
adminRouter.get("/audit", listAudit);
