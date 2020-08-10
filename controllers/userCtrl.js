const User = require('../models/user')

const addUserDetails = (req, res, next) => {

    const { firstName, lastName } = req.body;

    User.findByIdAndUpdate(req.user.id, { $set: { firstName, lastName } }, 
        { new: true }, (err, updatedUser) => {
        if (err) {
            console.log(err)
        } else {
            console.log(updatedUser)
            res.json(updatedUser)
            }
        })
}

const getUserDetails = (req, res, next) => {
    res.json(req.user)
    console.log(req.user)
}

module.exports = { addUserDetails, getUserDetails }