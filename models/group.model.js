const { Schema, model } = require('mongoose')

const groupSchema = new Schema({

    groupName: String,

    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' },

    groupMemebers: [{
        userId:
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        userName: String
    }]

}, { timestamps: true })

const groupModel = model('group', groupSchema)

module.exports = {
    groupModel
}