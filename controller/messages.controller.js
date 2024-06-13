const messageModel = require("../models/message.model")

const getMessages = async (req, res) => {

    try {

        const user = req.user

        const chatId = req.params.chatId

        const messages = await messageModel.find({ senderId: user._Id, recieverId: chatId })

        if (!messages) return res.status(404).json({ flag: false, message: 'No chat Found' })

        res.status(200).json({ flag: true, messages })

    } catch (error) {

        console.log('get all messages --> ', error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    getMessages
}