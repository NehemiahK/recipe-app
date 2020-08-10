const Recipe = require('../models/recipe')

const addRecipe = (req, res, next) => {
    if (!req.user) {
        res.redirect('/')
    }

    let {ingredientText,format,instructions,
        ingredients,source,title,tags} = req.body

        //tags should be an array.
        tags = tags.split(',')

    const newRecipe = {ingredientText,format,instructions,
        ingredients,source,title,tags}

    let options = {upsert: true, new: true, setDefaultsOnInsert: true};

    const id = req.params.id || ''

    Recipe.findOneAndUpdate({_id:id}, newRecipe , options ,(err,recipe) => {
        if(err){
            console.log(err)
        }else{
            console.log(recipe)
            res.json(recipe)
        }
    })
}

const deleteRecipe = (req,res,next) => {
    Recipe.findByIdAndDelete(req.params.id,(err,recipe) => {
        if(err){
            console.log(err)
        }else{
            console.log(recipe)
            res.json(recipe)
        }
    })
}

const getRecipe = (req,res,next) => {

    console.log('id',req.params.id)

    Recipe.findById(req.params.id, (err,recipe) => {
        if(err){
            console.log(err)
        }else{
            console.log(recipe)
            res.json(recipe)
        }
    })
}


const getRecipes = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/')
    }else{
        
        let {title} = req.query
        
        title = `.*${title || ''}.*`

        const recipe = await Recipe
            .find({title: {$regex: title, $options: 'i'}}).sort('title').limit(5);
        console.log(recipe)
        res.json(recipe)
    }
}

module.exports = { addRecipe, getRecipes, getRecipe,deleteRecipe }