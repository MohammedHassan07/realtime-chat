const messageModel = require('../models/message.model')

const saveMessages = async ({ sender, data }) => {

    try {

        // console.log(sender, data)

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

        const userId = user._id
        const chatId = req.params.chatId

        if (user._id == chatId) return

        let messages = await messageModel.find(
            {
                $or: [
                    { senderId: userId, recieverId: chatId },
                    { senderId: chatId, recieverId: userId }
                ]
            }).lean()

        messages = messages.map(message => {
            // console.log('IDs --> ', userId, message.recieverId)
            if (chatId === message.recieverId.toString()) {

                return {
                    ...message,
                    position: 'right'
                }
            }

            return {
                ...message,
                position: 'left'
            }
        });

        if (!messages) return res.status(404).json({ flag: false, message: 'No chat Found' })

        console.log('messages-->', messages)
        return res.status(200).json({ flag: true, messages })

    } catch (error) {

        console.log('get all messages --> ', error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    getMessages,
    saveMessages
}