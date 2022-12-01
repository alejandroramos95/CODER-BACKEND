const mongoose = require("mongoose");
const findOrCreate = require ('mongoose-findorcreate');

const GitHubAuthorSchema = new mongoose.Schema({
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

GitHubAuthorSchema.plugin(findOrCreate);

const GitHubAuthorModel = mongoose.model('GitHub_Autores', GitHubAuthorSchema);

module.exports = { GitHubAuthorModel }