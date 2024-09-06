import Jwt from "../../../utils/Jwt.js";
import UserProfile from "../../../models/UserProfile.js";
import AddUserProfileSchema from "./AddUserProfileValidators.js";

export default async function AddUserProfileAsync(req, res) {
    try {
        const jwtToken = req.headers.authorization;
        if (!Jwt.isTokenValid(jwtToken)) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        const userProfile = await AddUserProfileSchema.validateAsync(req.body);
        const createdUserProfile = await UserProfile.create(userProfile);
        return res.status(201).json({
            message: "User Profile successfully",
            data: createdUserProfile,
        });

    } catch (error) {
        if (error.isJoi) {
            return res.status(400).json({
                message: "Validation Error",
                data: error.details[0].message,
            });
        }

        return res.status(500).json({
            message: error.message,
        });
    }
}