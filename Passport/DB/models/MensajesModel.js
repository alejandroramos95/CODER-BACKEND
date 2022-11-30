const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    _id: Number,
    email: String,
    text: String,
    dateTime: String,
});

const MessageModel = mongoose.model('Mensajes', MessageSchema);

module.exports = { MessageModel }