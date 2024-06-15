const {Schema, model} = require('mongoose')

const messageSchema = new Schema({

    senderId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    recieverId: {

        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    message: String,

}, {timestamps:true})

const messageModel = model('Message', messageSchema)

module.exports = messageModel