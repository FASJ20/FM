import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import fs from "fs";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import { mongouri } from "./config/env.config.js";
import authRouter from "./routes/auth.route.js";
import membersRouter from "./routes/members.route.js";

const app = express();

//Let's us use json parsed from the body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const file = fs.readFileSync("./src/docs.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", authRouter);
app.use("/api/members", membersRouter);

mongoose
  .connect(mongouri)
  .then(() => console.log("connected to database"))
  .catch((err) => console.error(`Error: ${err}`));

app.get("/", (req, res) => {
  res.send("hello");
});

export default app;
