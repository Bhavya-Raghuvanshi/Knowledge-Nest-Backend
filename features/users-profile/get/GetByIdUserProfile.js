import UserProfile from "../../../models/UserProfile.js";
import Jwt from "../../../utils/Jwt.js";
export default async function GetByIdUserProfileAsync(req, res) {
    try {
        const jwtToken = req.headers.authorization;
        if (!Jwt.isTokenValid(jwtToken)) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const userId = req.params.id;

        const userProfile = await UserProfile.findOne({
            where: { UserId: userId }
        });

        if (!userProfile) {
            return res.status(404).json({
                message: "UserProfile not found",
            });
        }
        return res.status(200).json({
            data: userProfile,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}
