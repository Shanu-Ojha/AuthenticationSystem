const { verifyAccessToken } = require("../utils/auth")
const userModel = require("../models/user.model")

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Unauthorized, access token not found",
            })
        }

        const accessToken = authHeader.split(" ")[1]

        const decoded = verifyAccessToken(accessToken)

        const user = await userModel.findById(decoded.id)

        if (!user) {
            return res.status(401).json({
                message: "User not found",
            })
        }

        req.user = user

        next()

    } catch (error) {
        console.error(error)

        return res.status(401).json({
            message: "Unauthorized, invalid or expired access token",
        })
    }
}

module.exports = authenticate