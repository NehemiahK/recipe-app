const User = require('../models/user')

const addUserDetails = (req, res, next) => {
    console.log(req.body)
    if (!req.user) {
        res.redirect('/')
    }

    const newDetails = { firstName, lastName } = req.body;

    if(!req.body.status){
        newDetails.status = 1;
    }
   
    User.findByIdAndUpdate(req.user.id, { $set: req.body }, 
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