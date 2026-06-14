import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
    },
    authProvider: {
        type: String,
        required: true,
        enum: ["local", "google"]
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin", "owner"]
    },
    addresses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        }
    ],
    refreshToken: {
        type: String
    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        }, 
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
    return token;
}

userSchema.methods.generateRefreshToken = function () {
    const token = jwt.sign(
        {
            _id: this._id
        }, 
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
    return token;
}

export const User = mongoose.model("User", userSchema);