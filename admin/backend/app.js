import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import "dotenv/config"

const app = express();

// const ownersRouter = require("./routes/ownersRouter");
// const productsRouter = require("./routes/productsRouter");
// const usersRouter = require("./routes/usersRouter");
// const indexRouter = require("./routes/index");

// const db = require("./config/mongoose-connection");

app.use(express.json());;
app.use(express.urlencoded({ extended: true }));;
app.use(cookieParser()); ;
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);

app.get("/", (req, res) => {
    res.send("hello world!");
})

app.get("/arham", (req, res) => {
    console.log("arham")
})

// app.use("/api", indexRouter);
// app.use("/api/owners", ownersRouter);
// app.use("/api/users", usersRouter);
// app.use("/api/product", productsRouter);

app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
})