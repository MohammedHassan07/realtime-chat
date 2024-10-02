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


        /* TODO: get all the groups in which user is admin or the user is member, the output -->[
        [{
          _id: new ObjectId('66f922d8aae791abe89d1ed1'),
          groupName: 'Party',
          groupAdmin: new ObjectId('66f9228aaae791abe89d1ebb'),
          groupMemebers: [ [Object], [Object], [Object] ],
          createdAt: 2024-09-29T09:50:16.105Z,
          updatedAt: 2024-09-29T09:50:16.105Z,
          __v: 0
        }]

        the function is working only for the admin, it doesn`t check for the group members
        */
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