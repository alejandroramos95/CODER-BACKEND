/* REQUIRES */
const express = require('express');
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { fork } = require('child_process');
const yargs = require('yargs');
const args = yargs(process.argv.slice(2))
.alias({m: 'mode',p: 'port',d: 'debug'}).default({mode: "prod",port: 8080,debug: false}).argv

/* CONST Y MIDDLEWARES */
const API = express.Router();
API.use(express.json());

/* FUNCIONES */

function checkAutentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({status:false});
    }
}

/* APIs */

API.get('/products', (req, res) =>{
    const productos = BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

API.get('/random', (req, res) =>{
    let cantidad;
    if(isNaN(parseInt(req.query.cant)) || parseInt(req.query.cant) < 1 || parseInt(req.query.cant) > 1000000){
        cantidad = 200000;
    }else{
        cantidad = parseInt(req.query.cant);
    }
    console.log("se calcularan "+cantidad+" numeros aleatorios");
    const forked = fork('./child_process.js');
    forked.send(cantidad);
    console.log("Subproceso iniciado...");
    forked.on('message', (result) => {
        console.log("Subproceso finalizado...");
        result.port = args.p;
        res.json(result);
    });
});

API.get('/login/', async (req, res) => {
    req.session.username
        ? res.json(req.session)
        : res.json({status:false});
});

API.get('/SessionisActive/', checkAutentication, async(req, res) => {
    res.json({status: true});
})



module.exports = { API }