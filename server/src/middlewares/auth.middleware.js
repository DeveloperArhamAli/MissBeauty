import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";

const getTokenFromRequest = (req) => {
    const cookieToken = req.cookies?.accessToken;
    const authHeader = req.header && req.header("Authorization");
    const bearerToken = authHeader && typeof authHeader === "string" && authHeader.startsWith("Bearer ")
        ? authHeader.replace("Bearer ", "")
        : authHeader;
    return cookieToken || bearerToken;
};

const verifyRole = (requiredRole) => asyncHandler( async (req, _, next) => {
    const token = getTokenFromRequest(req);
    if (!token) {
        throw new ApiError(401, "Unauthorized: missing access token");
    }

    const secret = process.env.ACCESS_TOKEN_SECRET;

    let decoded;
    try {
        decoded = jwt.verify(token, secret);
    } catch (err) {
        throw new ApiError(401, "Invalid access token", null, err.stack);
    }

    const user = await User.findById(decoded?._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "Invalid access token");
    }

    if (user.role !== requiredRole) {
        throw new ApiError(403, "Forbidden: insufficient privileges");
    }

    req.user = user;
    next();
} );

const verifyOwner = verifyRole("owner");
const verifyAdmin = verifyRole("admin");
const verifyUser = verifyRole("user");

export {
    verifyOwner,
    verifyAdmin,
    verifyUser
};