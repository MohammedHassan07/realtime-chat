const {model, Schema} = require('mongoose')
const UserSchema = new Schema({

    name: String,
    mobile: String,
    password: String
    
}, {timestamps: true}) 

const userModel = model('User', UserSchema)

module.exports = userModel