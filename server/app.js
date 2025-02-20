const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");

require("dotenv").config();

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");

const db = require("./config/mongoose-connection");

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
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api", indexRouter);
app.use("/api/owners", ownersRouter);
app.use("/api/users", usersRouter);
app.use("/api/product", productsRouter);

app.listen(process.env.PORT, () => {
    console.log(`App running on http://localhost:${process.env.PORT}`);
})