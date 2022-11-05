const express = require('express');
const Router = express.Router();
Router.use(express.json());
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');

Router.get('/', (req, res) =>{
    let productos = BD_Productos.getAll();
	res.render('main',{layout : 'index', 'productos': productos});
});

module.exports = { Router };
