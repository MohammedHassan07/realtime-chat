const { groupModel } = require("../models/group.model")
const userModel = require("../models/user.model")

// get all chats and group chats as well to show on side bar 
const getAllChats = async (req, res) => {

    try {

        const user = req.user

        const chats = await userModel.find()

        const groups = await groupModel.aggregate([
            {
                $match: {

                    $or: [
                        { groupAdmin: user._id },
                        { 'groupMemebers.userId': user._id }
                    ]
                }
            }
        ])

        if (!groups && !chats)
            return res.status(404).json({ flag: false, message: "No chats found" })

        if (!groups)
            return res.status(200).json({ flag: true, chats })

        res.status(200).json({ flag: true, chats, groups })
        console.log(JSON.stringify(groups, null, 2))

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    getAllChats
}