import express, { Express, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerDocument from "./swagger.json";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import { rateLimit } from "express-rate-limit";

import authRouter from "./Routes/Auth";
import chartRouter from "./Routes/Chart";
import SwaggerDocRouter from "./Routes/SwaggerDoc";

import authMiddleware from "./middleware/authMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const db_connection_url = process.env.DB_URL || "";
mongoose.connect(db_connection_url);
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});


app.use(urlencoded({ limit: "50mb", extended: true }));

app.use(json({ limit: "50mb" }));
app.use(express.json());
app.use(cors());
app.use(limiter);

app.use("/api/auth", authRouter);
app.use("/api/chart", authMiddleware, chartRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api-docs-config", SwaggerDocRouter);

app.listen(port, () => {
  // logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  // logger.info(`Test log message! ${process.env.OWN_API_URL}`);
  res.send("Express + TypeScript Server v0.0.10");
});