const mongoose = require("mongoose");

const AuthorLocalSchema = new mongoose.Schema({
    email: {
        type:String, 
        required:true
    },
    name: String,
    last_name: String,
    age: Number,
    nickname: String,
    avatar: String,
    password: String,
    Timestamp: String,
    linked_account: String
});

const Author_Local_Model = mongoose.model('Local_Autores', AuthorLocalSchema);

module.exports = { Author_Local_Model }