import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import usersRouter from "./routes/usersRouter.js";
import ownersRouter from "./routes/ownersRouter.js";
import productsRouter from "./routes/productsRouter.js";
import indexRouter from "./routes/index.js";

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/owners", ownersRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/", indexRouter);

export { app };