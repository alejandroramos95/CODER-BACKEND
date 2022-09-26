const express = require('express');
const Router = express.Router();
const BD_Productos = require('../api/productos');

Router.get('/', (req, res) =>{
    const productos = BD.getAll();
	res.render('main',{layout : 'index', 'productos': productos});
});

Router.post('/', (req, res) =>{
    const productos = BD.getAll();
    console.log(productos.length);
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

const BD = new BD_Productos();
module.exports = {Router, BD};
