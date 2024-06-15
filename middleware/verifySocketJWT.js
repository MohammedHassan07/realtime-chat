const jwt = require('jsonwebtoken')
const cookie = require('cookie')
const userModel = require('../models/user.model')
const cookieParser = require('cookie-parser')

const verifySocketJWT = async (socket, next) => {

    try {

        const cookieHeader = socket.handshake.headers.cookie

        const cookies = cookie.parse(cookieHeader).token

        const userToken = JSON.parse(decodeURIComponent(cookies.slice(2))).token

        if (!userToken) {
            return next(new Error("Authorization token is missing or invalid. Please provide a valid JWT token."))
        }

        const verifiedToken = jwt.verify(userToken, process.env.ACCESS_TOKEN)

        if (!verifiedToken) {

            return next(new Error("Authorization token is missing or invalid. Please provide a valid JWT token."))
        }

        const user = await userModel.findOne({ mobile: verifiedToken }).select('-password')

        socket.user = user

        next()

    } catch (error) {

        console.log(error)
        return next(error)
    }
}

module.exports = verifySocketJWT