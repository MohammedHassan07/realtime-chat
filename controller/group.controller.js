const createGroup = async (req, res) => {

    const { groupName, memberNumbers } = req.body

    try {

        const user = req.user
        console.log('create group --> ', req.body)

        

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    createGroup
}