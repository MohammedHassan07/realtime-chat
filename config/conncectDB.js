const mongoose = require('mongoose')


const connectDB = async () => {

    const connectionURL = process.env.DB_URL

    // console.log(connectionURL)

    const connection = await mongoose.connect(connectionURL)
    if (connection) {

        console.log('connected')
    }
}

module.exports = connectDB