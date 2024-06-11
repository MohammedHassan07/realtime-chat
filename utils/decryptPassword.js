const bcrypt = require('bcryptjs')

const decryptpaaword = async (password, userPassword) => {

    try {
        // console.log('decrypt --> ', password, userPassword)

        const valid = await bcrypt.compare(password, userPassword)

        // console.log('decrypt --> ', valid)

        if (valid)
            return {

                flag: true,
            }

        return {

            flag: false,
            data: error
        }
    } catch (error) {

        return ({

            flag: false,
            data: error
        })
    }
}

module.exports = decryptpaaword