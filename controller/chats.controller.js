const { groupModel } = require("../models/group.model")
const userModel = require("../models/user.model")

// get all chats and group chats as well to show on side bar 
const getAllChats = async (req, res) => {

    try {

        const user = req.user

        const chats = await userModel.find()

        if (!chats)
            return res.status(404).json({ flag: false, message: "No chats found" })


        res.status(200).json({ flag: true, data: chats, type: 'chat'})

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    getAllChats
}