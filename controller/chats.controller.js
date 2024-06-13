const userModel = require("../models/user.model")

const getAllChats = async (req, res) => {

    try {

        const user = req.user

        const chats = await userModel.find()

        if (!chats) {

            return res.status(404).json({flag: false, message: "No chats found"})
        }

        res.status(200).json({flag: true, chats})
 
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    getAllChats
}