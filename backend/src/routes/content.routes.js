import { Router } from "express";
import { listLibrary, listProviders } from "../controllers/public.controller.js";

export const contentRouter = Router();

contentRouter.get("/library", listLibrary);
contentRouter.get("/providers", listProviders);
