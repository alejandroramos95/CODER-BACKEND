const express = require('express');
const Router = express.Router();
const {BD_Productos, Chat} = require('../api/productos');

Router.get('/', (req, res) =>{
    const productos = BD.getAll();
	res.render('main',{layout : 'index', 'productos': productos});
});

Router.post('/', (req, res) =>{
    const productos = BD.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

const BD = new BD_Productos();
const BD_Messages = new Chat();
module.exports = {Router, BD, BD_Messages};
