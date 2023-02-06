/* =============== IMPORTACIONES =============== */
const Passport = require('passport');
const services = require('../services/Functions.services');


/* =============== ROUTERS =============== */

const home = async (req, res) => {
    console.log("Autenticado: "+req.isAuthenticated());
    if(req.isAuthenticated() && req.cookies.data_user === undefined){
        res.cookie('data_user', await services.createCookie(req.session.passport.user), {maxAge:60*10000, httpOnly: false})
    }else if(!req.isAuthenticated()){
        res.clearCookie("data_user");
    }
    services.console_logger.info("Acceso a ruta main");
    res.render('main',{layout : 'index'});
};

const info_route = (req, res)=>{
    console.log('nueva petición');
    info = services.info_data();
    services.console_logger.info("Acceso a ruta info")
    console.log(info);
    res.render('main',{layout : 'info', 'data':info});
}

/* SESSION */

const login = Passport.authenticate('login',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
})

const register = Passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: 'fail_register'
})

const logout = (req, res) =>{
    req.logOut(function(err){
        if(err)return next(err);
    });
    services.console_logger.info("Acceso a ruta logout");
    res.redirect('/');
}

/* FAIL SESSION */
const fail_login = (req, res) =>{
    services.console_logger.info("Acceso a ruta fail_login");
    res.render('main',{layout: 'error_template', err: true});
};

const fail_register = (req, res) =>{
    services.console_logger.info("Acceso a ruta fail_register");
    res.render('main',{layout: 'error_template', err: false});
}

/* =============== EXPORT =============== */
module.exports = {
    home,
    info_route,
    login,
    register,
    fail_login,
    fail_register,
    logout,
};
