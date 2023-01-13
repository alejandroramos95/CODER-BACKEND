const services = require('../services/Services');

function checkAutentication(req, res, next){
    services.console_logger.info("Intento de acceso a ruta protegida");
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        next();
    }
}

function checkUnautentication(req, res, next){
    services.console_logger.info("Intento de acceso a ruta protegida");
    if(req.isUnauthenticated()){
        res.redirect('/');
    }else{
        next();
    }
}

function check_API_Autentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.json({status:false});
        services.console_logger.error("Intento de acceso a ruta protegida sin autenticacion");
    }
}

module.exports = {
    checkAutentication,
    checkUnautentication,
    check_API_Autentication
};