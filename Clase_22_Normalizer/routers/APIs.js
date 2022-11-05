const express = require('express');
const API = express.Router();
API.use(express.json());

const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { Normalizer } = require('../DB/Normalizer/Normalizr');

/* APIs */

API.get('/products', (req, res) =>{
    const productos = BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

API.get('/lvlcompression', (req, res) => {
    const compresion = Normalizer.getlvlCompression();
    res.json(compresion);
});

module.exports = { API }