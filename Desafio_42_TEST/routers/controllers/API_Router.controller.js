const Passport = require('passport');
const BD_Productos = require('../../DB/DAOs/DAO-FACTORY').returnDBConnection();
const { serviceAutores } = require('../services/Autores.service');
const { console_logger, generateRandom } = require('../services/Functions.services');

/* =============== ROUTERS =============== */
const productsView = async(req, res) =>{
    const productos = await BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
}

const products = async(req, res) =>{
    const productos = await BD_Productos.getAll();
    res.json(productos);
}

const setProduct = async(req, res) =>{
    const product = req.body;
    await BD_Productos.setProduct(product)
    ? res.json({status:true, product})
    : res.json({status:false});
};

const productID = async(req, res) =>{
    const productos = await BD_Productos.getById(req.params.id);
    res.json(productos || {status:false});
}

const deleteProduct = async(req, res) =>{
    if(!await BD_Productos.getById(req.params.id))
        return res.json({status:false});
    const status = await BD_Productos.deleteByID(req.params.id);
    res.json({status});
}


const users = async(req, res) =>{
    const usuarios = await serviceAutores.getAllSrv();
    res.json(usuarios);
};

const PassportCreateUser = Passport.authenticate('signup',{
    failureRedirect: '/fail_register'
})

const setUser = (req, res) => {
    res.json({status:true})
};

const userID = async(req, res) =>{
    const usuario = await serviceAutores.getByIdSrv(req.params.id);
    res.json(usuario);
};

const deleteUser = async(req, res)=> {
    const status = await serviceAutores.deleteByIdSrv(req.session.passport.user);
    req.session.destroy();
    res.json({status});
};

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
    productsView,
    products,
    setProduct,
    productID,
    users,
    userID,
    deleteProduct,
    random,
    checkLogin,
    checkSession,
    deleteUser,
    setUser,
    PassportCreateUser,
}