import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
}

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, error.message)
    }
};

const registerUser = asyncHandler( async (req, res) => {
    const { fullName, email, password } = req.body;
    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are mandatory");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "User with the same email already exists");
    }

    const user = await User.create({ fullName, email, password });

    const registeredUser = await User.findById(user._id).select("-password -refreshToken");
    if (!registeredUser) {
        throw new ApiError(500, "Couldn't register user")
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                registeredUser,
                "User registered successfully"
            )
        );
} )

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged in successfully"
                )
            )
} )

const logoutUser = asyncHandler( async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "User logged out successfully"
                )
            )
} )

const refreshAccessToken = asyncHandler( async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Missing refresh token");
    }

    try {
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (user?.refreshToken !== incomingRefreshToken) {
            throw new ApiError(401, "Expired refresh token, Please login again");
        }

        const { accessToken, refreshToken} = await generateTokens(user._id);

        return res
                .status(200)
                .cookie("accessToken", accessToken, options)
                .cookie("refreshToken", refreshToken, options)
                .json(
                    new ApiResponse(
                        200,
                        {
                            accessToken, refreshToken
                        },
                        "Access token refreshed successfully"
                    )
                )
    } catch (error) {
        throw new ApiError(401, "Invalid refresh token" , null, error.stack);
    }
} )

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}