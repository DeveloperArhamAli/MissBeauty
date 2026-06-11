const jwt = require("jsonwebtoken")
const userModel = require("../models/user-model")

async function isLoggedIn(req, res, next) {
    if (!req.cookies.token) {
        res.send({
            errorMessage: "You need to login first!",
        })
    } else if (req.cookies.token) {
        try {
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");
            req.user = user;
            res.send({
                successMessage: "You are logged in",
                userData: user,
                loggedIn: true,
            })
        } catch (err) {
            req.send({
                errorMessage: "An error occurred",
                loggedIn: false,
            })
        }
    }
}

async function checkIfLoggedIn(req, res, next) {
    if (req.cookies.token) {
        try {
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            let user = await userModel.findOne({ email: decoded.email })
            .select("-password");
            req.user = user;
            return res.redirect("/users/profile");
        } catch (err) {
            res.redirect("/login");
        }
    } else {
        next();
    }
}

module.exports = { isLoggedIn, checkIfLoggedIn }