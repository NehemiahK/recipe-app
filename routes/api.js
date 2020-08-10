const express = require('express');
const router = express.Router()

const { addUserDetails, getUserDetails} = require('../controllers/userCtrl')
const { addRecipe, getRecipes,getRecipe, deleteRecipe } = require('../controllers/recipeCtrl')

const {isApproved} = require('../utils/auth')

router.put('/user', addUserDetails, (req, res) => { 

})

router.get('/user', getUserDetails, (req, res) => {

})

router.post('/recipe', isApproved, addRecipe, (req, res) => {

})

router.delete('/recipe/:id', isApproved, deleteRecipe, (req, res) => {

})

router.put('/recipe/:id', isApproved, addRecipe, (req, res) => {

})


router.get('/recipe/:id', isApproved, getRecipe, (req, res) => {

})

router.get('/recipes', isApproved, getRecipes, (req, res) => {

})

module.exports = router;
