const { groupModel } = require('../models/group.model')

// create group
const createGroup = async (req, res) => {

    try {

        const admin = req.user
        const adminId = admin._id
        // console.log(admin.name, admin._id)

        const { groupName, usersInGroup } = req.body

        // adding the users in to usersInGroup who created the group
        usersInGroup.push({ userId: adminId, userName: admin.name })

        // console.log(usersInGroup)

        const group = new groupModel({ groupName, groupAdmin: adminId, groupMemebers: usersInGroup })

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

// get all group in which user is present or the user is admin
const getAllGroups = async (req, res) => {

    try {

        const user = req.user

        console.log(user._id)

        // const groups = await groupModel.aggregate([
        //     {
        //         $match: {

        //             $or: [
        //                 { groupAdmin: user._id },
        //                 { groupMemebers: user._id }
        //             ]
        //         }
        //     }
        // ])

        // const groups = await groupModel.findById(user._id).populate('groupMembers')

        // if (!groups)
        //     return res.status(404).json({ flag: false, message: 'No group found' })

        // res.status(200).json({ flag: true, data: groups, type: 'group' })

        // console.log(JSON.stringify(groups, null, 2))
        // console.log(groups)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}

module.exports = {

    createGroup,
    getAllGroups
}