const mongoose = require("mongoose");
// creating schema
const userSchema = new mongoose.Schema({
name: String,
email: String,
password: String
});
// uske bad hume export krna hai module ko 
module.exports = mongoose.model("users", userSchema);