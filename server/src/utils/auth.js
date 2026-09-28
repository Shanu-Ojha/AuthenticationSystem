const jwt = require("jsonwebtoken");
require("dotenv").config()

const generateTokens = ({ userId }) => {

    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "10m" })
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })

    return { accessToken, refreshToken }
}

const verifyAccessToken = (token) => {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    return decoded
}

const verifyRefreshToken = (token) => {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    return decoded
}

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken } 