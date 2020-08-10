var mongoose = require("mongoose");

var recipeSchema = new mongoose.Schema({
    title: String,
    source: String,
    ingredients:[{ingredient: String, amount:String, id: Number}],
    instructions: String,
    format: String,
    ingredientText: String,
    tags:[String]
 });
 
 module.exports = mongoose.model("Recipe", recipeSchema);