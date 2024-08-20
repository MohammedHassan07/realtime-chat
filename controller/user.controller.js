const userModel = require("../models/user.model")
const decryptpaaword = require("../utils/decryptPassword")
const generateToken = require("../utils/generateToken")
const hasEntry = require("../utils/hasEntry")
const hashPassword = require("../utils/hashPassword")

// render registration form
const authenticate = (req, res) => {
    res.render('authentication.html')
}

// register user
const registerUser = async (req, res) => {

    try {

        // console.log('start --> ', req.body)
        const { name, mobile, password } = req.body

        const entryData = await hasEntry(mobile)

        // console.log('register --> ', entryData)
        if (entryData.flag) {

            res.status(409).json({

                error: entryData.error,
                message: entryData.message
            })
            res.end()
        } else {

            const userPassword = await hashPassword(password)
            // console.log('userPin-->', userPassword)

            if (!userPassword.flag) {

                res.status(500).json({

                    error: "Internal Server Error",
                    message: userPin.data
                })
                return
            } else {


                const userData = new userModel({ name, mobile, password: userPassword.data })
                const savedData = await userData.save()

                if (!savedData) {

                    res.status(500).json({

                        error: "Internal Server Error",
                        message: "An error occurred while attempting to save the data. Please try again later."
                    })

                    return
                }

                // console.log(savedData)
                res.status(201).json({ message: "User registered successfully." })
            }
        }
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

// login user
const loginUser = async (req, res) => {

    const { mobile, password } = req.body
    // console.log('login -->', req.body)

    const entryData = await hasEntry(mobile)

    if (entryData.flag) {

        const userPassword = entryData.data.password

        const valid = await decryptpaaword(password, userPassword)

        if (valid.flag) {

            const token = await generateToken(mobile)

            if (token.flag) {

                res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'strict'
                })

                res.status(200).json({

                    userName: entryData.data.name,
                    flag: true,
                    message: "Login Successfull",
                })
                return
            }

            res.status(401).json({
                error: token.error,
                message: token.message
            })
            return
        }

        res.status(401).json({
            error: "Unauthorized",
            message: "Please check your username and password and try again."
        })
        return
    }

    res.status(401).json({
        error: "Unauthorized",
        message: "Please check your username and password and try again."
    })
    return

}

// get user by name
const getUserByName = async (req, res) => {

    const userName = req.params.userName
    const pattern = new RegExp(userName, 'i')

    try {

        const users = await userModel.find({

           name: pattern
        }, { password: 0, mobile: 0 }).lean() // exclude password and mobile
        // console.log(users)

        if (users.length != 0) {
            res.status(200).json({ flag: true, users })
            return
        }

        return res.status(404).json({ flag: false, message: 'No User Found' })
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    registerUser,
    loginUser,
    authenticate,
    getUserByName
}