const bcrypt = require('bcryptjs')

const hashPassword = async (userPassword) => {

    try {

        const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT))
        // console.log(salt)
        
        const password = await bcrypt.hash(userPassword, salt)
        // console.log(password)

        if (password) return ({

            flag: true,
            data: password
        })

        else return ({

                flag: false,
                data: 'Something went wrong'
            })

    } catch (error) {

        console.log('hash password', error)
        return ({

            flag: false,
            data: error
        })
    }

}

module.exports = hashPassword