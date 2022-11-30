const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
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
    Timestamp: String
});

const AuthorModel = mongoose.model('Autores', AuthorSchema);

module.exports = { AuthorModel }