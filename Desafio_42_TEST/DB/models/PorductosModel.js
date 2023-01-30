const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
    _id: Number,
    title: String,
    price: Number,
    thumbnail: String,
});

const ProductsModel = mongoose.model('Productos', ProductsSchema);

module.exports = { ProductsModel }