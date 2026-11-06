import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { apiRouter } from "./routes/index.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { originGuard } from "./middleware/originGuard.js";

export const app = express();

app.disable("x-powered-by");
app.set(
  "trust proxy",
  env.nodeEnv === "production" && process.env.TRUST_PROXY === "true" ? 1 : false,
);
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.clientUrls.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-CSRF-Token"],
  }),
);
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(originGuard);

app.use("/api/v1", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);
