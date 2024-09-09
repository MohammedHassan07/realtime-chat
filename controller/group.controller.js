const { groupModel } = require('../models/group.model')

// create group
const createGroup = async (req, res) => {

    try {

        const adminId = req.user._id

        const { groupName, usersInGroup } = req.body

        const group = new groupModel({ groupName, groupAdmin:adminId, groupMemebers: usersInGroup })

        const savedGroup = await group.save()

        if (!savedGroup) {

            res.status(500).json({ flag: false, message: 'Internal Server Error' })
            return
        }

        res.status(201).json({ flag: true, message: 'Group Created Successfully' })
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    createGroup
}