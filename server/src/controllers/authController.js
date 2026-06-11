const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/generateToken");
const ownerModel = require("../models/owner-model");

const registerUser = async function(req, res){
    try{
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email })
        if(user) {
            res.send({
                errorMessage: "User already exists",
            })
        }

        if (!user) {
            bcrypt.genSalt(10, function (err, salt){
                bcrypt.hash(password, salt, async function (err, hash){
                    if(err) return res.send(err.message)
                    else{
                        let user = await userModel.create({
                            email,
                            password: hash,
                            fullname,
                        });
                        let token = generateToken(user);
                        res.cookie("token", token);
                        res.send({
                            successMessage: "User registered successfully",
                            token: token,
                            user,
                        })
                    }
                })
            })
        }

    } catch(err) {
        res.send({
            errorMessage: err.message,
        });
    }
}

const loginUser = async function(req, res) {
    let {email, password} = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) {
        res.send({
            errorMessage: "User not found",
        })
    }

    if (user) {
        bcrypt.compare(password, user.password, function(error, result) {
            if(result){
                let token = generateToken(user);
                res.cookie("token", token);

                const plainUser = JSON.parse(JSON.stringify(user));

                if (plainUser.isAdmin) {
                    res.send({
                        successMessage: "Logged in successfully",
                        token: token,
                        user,
                        isAdmin: true,
                    });
                    return;
                } else {
                    res.send({
                        successMessage: "Logged in successfully",
                        token: token,
                        user,
                    });
                    return;
                }
            }
            else {
                if (error) {
                    res.send({
                        errorMessage: error.message,
                    });
                    return
                }
            }
            res.send({
                errorMessage: "Email or Password incorrect",
            })
        })
    }
}

const  ownerLogin = async function(req, res) {
    let {email, password} = req.body;

    let owner = await ownerModel.findOne({ email: email });
    if (!owner) {
        res.send({
            errorMessage: "Owner not found",
        })
        return;
    }

    if (owner) {
        bcrypt.compare(password, owner.password, function(err, result) {
            if(result){
                let token = generateToken(owner);
                res.cookie("token", token);
                res.send({
                    successMessage: "Logged in successfully",
                })
            }
            else{
                req.flash("error", "Email or Password incorrect");
                return res.redirect("/owner-login");
            }
        })
    }
}

const logout = function (req, res) {
    try {
        res.cookie("token", "");
        res.send({
            successMessage: "Logged out successfully",
            loggedOut: true,
        })
    } catch (error) {
        res.send({
            errorMessage: error.message,
            loggedOut: false,
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    ownerLogin,
    logout,
}