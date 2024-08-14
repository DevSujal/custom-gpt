import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const limit = "16kb";

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit }));

app.use(
  express.urlencoded({
    extended: true,
    limit,
  })
);

app.use(express.static("public"));

app.use(cookieParser());

// routes

import router from "./routes.js";

app.use("/api/v1", router)

export default app;