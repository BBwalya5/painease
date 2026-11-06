import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRouter } from "./auth.routes.js";
import { accountRouter } from "./account.routes.js";
import { contentRouter } from "./content.routes.js";
import { professionalRouter } from "./professional.routes.js";
import { adminRouter } from "./admin.routes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/", accountRouter);
apiRouter.use("/", contentRouter);
apiRouter.use("/", professionalRouter);
apiRouter.use("/admin", adminRouter);
