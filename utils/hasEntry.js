const userModel = require("../models/user.model")

const hasEntry = async (userData) => {

    // console.log(userData)

    try {

        let data;

        data = await userModel.findOne({ mobile: userData })

        // console.log('has entry -->', data, userData)
        if (data) {

            return {

                flag: true,
                error: "Duplicate Entry",
                message: "User Already present with this mobile number.",
                data: data
            }
        }

        return {

            flag: false
        }
    } catch (error) {

        console.log('has entry', error)
    }
}

module.exports = hasEntry