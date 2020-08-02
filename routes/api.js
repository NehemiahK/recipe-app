const express = require('express');
const router = express.Router()

const { addUserDetails, getUserDetails} = require('../controllers/userCtrl')

router.put('/user', addUserDetails, (req, res) => {

})

router.get('/user', getUserDetails, (req, res) => {

})

module.exports = router;
