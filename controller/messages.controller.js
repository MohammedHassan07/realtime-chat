const messageModel = require('../models/message.model')

const saveMessages = async ({ sender, data }) => {

    try {

        // console.log(data)

        const message = new messageModel({ senderId: sender._id, recieverId: data.recieverId, message: data.message })

        await message.save()

        // if (savedMessage) console.log(savedMessage)

    } catch (error) {

        console.log('save messages --> ', error)
    }
}

const getMessages = async (req, res) => {

    try {

        const user = req.user

        const chatId = req.params.chatId

        if (user._id == chatId) return


        const messages = await messageModel.find(
            {
                $or: [
                    { senderId: user._id, recieverId: chatId },
                    { senderId: chatId, recieverId: user._id }
                ]
            })

        console.log('get messages --> ', messages)

        if (!messages) return res.status(404).json({ flag: false, message: 'No chat Found' })

        res.status(200).json({ flag: true, messages })

    } catch (error) {

        console.log('get all messages --> ', error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    getMessages,
    saveMessages
}