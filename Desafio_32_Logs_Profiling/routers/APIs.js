/* REQUIRES */
const express = require('express');
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { fork } = require('child_process');
const yargs = require('yargs');
const { logger } = require('../Pino/pino');
const pino = require('pino');
const console_logger = pino({
    transport:{
        target: 'pino-pretty'
    }, 
    options:{
        colorize: true
    }
});
console_logger.level = 'error';
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
        logger.error("Intento de acceso a ruta protegida sin autenticacion");
        console_logger.error("Intento de acceso a ruta protegida sin autenticacion");
    }
}

async function generateRandom(cantidad){
    const numeros = [];
    const objetoNumeros = [];
    function generarNumeros()  {
        for(i=0; i<cantidad; i++){
            numeros.push(parseInt(Math.random() * cantidad + 1));
        }
        verificar();
    };
    function verificar() {
        let contador = 0;
        let indice;
        for (let j = 1; j <= cantidad;) {
            indice = numeros.indexOf(j);
            if(indice!=-1){
                contador++;
                numeros.splice(indice,1);
            }else{
                objetoNumeros.push({[j]: contador});
                contador = 0;
                j++;
            }
        }
    };
    generarNumeros();
    return objetoNumeros;
}

/* APIs */

API.get('/products', (req, res) =>{
    const productos = BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

API.get('/random', async(req, res) =>{
    let cantidad;
    if(isNaN(parseInt(req.query.cant)) || parseInt(req.query.cant) < 1 || parseInt(req.query.cant) > 1000000){
        logger.error("No se ingresó la cantidad a calcular-inicio por defecto: "+cantidad);
        cantidad = 200000;
    }else{
        cantidad = parseInt(req.query.cant);
        console_logger.error("se calcularan "+cantidad+" numeros aleatorios");
    }
    console.log("se calcularan "+cantidad+" numeros aleatorios");
    // const forked = fork('./child_process.js');
    // forked.send(cantidad);
    console.log("Subproceso iniciado...");
    // forked.on('message', (result) => {
    //     console.log("Subproceso finalizado...");
    //     result.port = args.p;
    //     res.json(result);
    // });
    const objetoNumeros=await generateRandom(cantidad);
    console.log(objetoNumeros);
    res.json(objetoNumeros);
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