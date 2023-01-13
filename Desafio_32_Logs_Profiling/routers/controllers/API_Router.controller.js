const { BD_Productos } = require('../../DB/DAOs/Productos.Faker');
const { console_logger, generateRandom } = require('../services/Services');

/* =============== ROUTERS =============== */
const products = (req, res) =>{
    const productos = BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
}

const random = async(req, res) =>{
    let cantidad;
    if(isNaN(parseInt(req.query.cant)) || parseInt(req.query.cant) < 1 || parseInt(req.query.cant) > 1000000){
        console_logger.error("No se ingreso la cantidad a calcular-inicio por defecto: "+cantidad);
        cantidad = 200000;
    }else{
        cantidad = parseInt(req.query.cant);
        console_logger.error("se calcularan "+cantidad+" numeros aleatorios");
    }
    console.log("se calcularan "+cantidad+" numeros aleatorios");
    console.log("Subproceso iniciado...");
    const objetoNumeros= await generateRandom(cantidad);
    console.log(objetoNumeros);
    res.json(objetoNumeros);
}

const checkLogin = async (req, res) => {
    req.session.username
        ? res.json(req.session)
        : res.json({status:false});
}

const checkSession = async(req, res) => {
    res.json({status: true});
}

/* =============== EXPORT =============== */
module.exports = {
    products,
    random,
    checkLogin,
    checkSession,
}