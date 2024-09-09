const { Schema, model } = require('mongoose')

const groupSchema = new Schema({

    groupName: String,

    groupAdmin: { type: Schema.Types.ObjectId, ref: 'User' },

    groupMemebers: []

}, { timestamps: true })

const groupModel = model('group', groupSchema)

module.exports = {
    groupModel
}