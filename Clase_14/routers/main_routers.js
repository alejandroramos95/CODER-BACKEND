const express = require('express');
const Router = express.Router();
Router.use(express.json());
const {BD_Productos, Chat} = require('../api/productos');

Router.get('/', async(req, res) =>{
    const productos = await BD_Products.getAll();
	res.render('main',{layout : 'index', 'productos': productos});
});

Router.get('/api/products', async(req, res) =>{
    const productos = await BD_Products.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

const BD_Products = new BD_Productos();
const BD_Messages = new Chat();
module.exports = {Router, BD: BD_Products, BD_Messages};
