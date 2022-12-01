const mongoose = require("mongoose");
const findOrCreate = require ('mongoose-findorcreate');

const GoogleAuthorSchema = new mongoose.Schema({
    _id: Number,
    email: {
        type:String
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

GoogleAuthorSchema.plugin(findOrCreate);

const GoogleAuthorModel = mongoose.model('Google_Autores', GoogleAuthorSchema);

module.exports = { GoogleAuthorModel }