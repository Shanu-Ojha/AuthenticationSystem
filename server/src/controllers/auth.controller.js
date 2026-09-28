const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const { generateTokens, verifyRefreshToken } = require('../utils/auth')

const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const isUserExists = await userModel.findOne({ email })

        if (isUserExists) {
            return res.status(400).json({
                message: "User already exists",
                errors: [
                    {
                        path: "email",
                        message: "User already exists"
                    } 
                ]
            })
        }

        // Save data in mongodb
        const user = await userModel.create({ username, email, password: await bcrypt.hash(password, 10) })

        const { accessToken, refreshToken } = generateTokens({ userId: user._id })


        user.refreshToken = refreshToken
        await user.save()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
        })

        res.status(201).json({
            message: "User created successfully...",
            data: {
                user: { email, username, id: user._id },
                accessToken
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to register user...",
            error: error.message
        })
    }
}

const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        return res.status(401).json({
            message: "Unauthorized, refresh token not found",
        })
    }

    try {

        const decoded = verifyRefreshToken(refreshToken)

        const user = await userModel.findById(decoded.id)

        if (refreshToken !== user.refreshToken) {

            user.refreshToken = null
            await user.save()

            return res.status(401).json({
                message: "Unauthorized, refresh token mismatch",
            })
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens({ userId: user._id })

        res.cookie("refreshToken", newRefreshToken, { httpOnly: true })

        user.refreshToken = newRefreshToken
        await user.save()

        res.status(200).json({
            message: "Tokens refreshed successfully",
            accessToken
        })
    }
    catch (err) {
        return res.status(401).json({
            message: "Unauthorized, Invalid or expired refresh token",
        })
    }
}

module.exports = { registerController, refreshTokenController }