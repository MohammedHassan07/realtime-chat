const jwt = require('jsonwebtoken')

const generateToken = async (userMobile) => {

    const accessToken = process.env.ACCESS_TOKEN

    const token = jwt.sign(userMobile, accessToken)

    if (token) {

        return {

            flag: true,            
            token: token,
        }
    }

    return {

        error: 'Something went wrong',
        message: 'Check your credentials'
    }
}

module.exports = generateToken