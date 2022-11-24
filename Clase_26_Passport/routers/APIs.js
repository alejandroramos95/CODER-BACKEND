/* REQUIRES */
const express = require('express');
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos');

/* CONST Y MIDDLEWARES */
const API = express.Router();
API.use(express.json());

/* FUNCIONES */


/* APIs */

API.get('/products', (req, res) =>{
    const productos = BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

API.get('/login/', async (req, res) => {
    req.session.username
        ? res.json(req.session)
        : res.json({status:false});
});

API.get('/SessionisActive/', checkAutentication, async(req, res) => {
    res.json({status: true});
})

function checkAutentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({status:false});
    }
}

module.exports = { API }