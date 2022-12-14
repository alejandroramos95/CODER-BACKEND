const express = require('express');
const multer = require('multer');
const path=require('path');
const products = express.Router();
const Productos = require('../api/products.js');
let oneStepBack=path.join(__dirname,'../');

/* CONFIG STORAGE */

let storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public/images");
    },
    filename: (request, file, callback) => {
		callback(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({storage});

/* ROUTERS */

products.get('/', (request, res) => {
    res.sendFile(oneStepBack+'/public/html/index.html');
});

products.get('/productos', (request, res) => {
    const datos = elements.getAll();
    const index = 1;
    const method = request.method;

    res.render("products-list", {datos, index, method});
});

products.post('/productos', upload.single("thumbnail"), (request, res, next) => {
    const file = request.file;
    console.log(request.body);
    const datos = elements.getAll();
    const method = request.method;

    let index = elements.setProduct(request.body);
    index != -1
        ? res.render("products-list", {datos, index, method})
        : res.render("products-list", {datos, index, method});
});

products.delete('/api/productos/:id', (request, res) => {
    console.log("CONSULTA DELETE");
    const index = elements.delete(parseInt(request.params.id));
    const datos = elements.getAll();
    const method = request.method;
    index != -1
        ? res.render("products-list", {datos, index, method})
        :res.render("products-list", {datos, index, method});
});

const elements = new Productos();
module.exports = products;