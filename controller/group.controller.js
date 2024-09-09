const createGroup = async (req, res) => {

    const { groupName, usersInGroup } = req.body

    try {

        const user = req.user
        console.log('create group --> ', req.body, user)

        

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    createGroup
}