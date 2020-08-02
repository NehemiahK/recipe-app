var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    facebookId: String,
    firstName: String,
    lastName: String,
    status: Number
 });
 
 module.exports = mongoose.model("User", userSchema);