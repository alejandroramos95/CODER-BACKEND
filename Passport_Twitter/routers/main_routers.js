const express = require('express');
const Router = express.Router();
const Passport = require('passport');
Router.use(express.json());
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos')

/* FUNCIONES */
function checkAutentication(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        next();
    }
}

async function createCookie(id){
    const data_user = await BD_Autores.getById(id);
    delete data_user._id;
    delete data_user.__v;
    delete data_user.password;
    console.log(data_user);
    return data_user;
}

/* ROUTERS */
Router.get('/', async(req, res) =>{
    console.log(req.isAuthenticated());
    if(req.isAuthenticated() && req.cookies.data_user === undefined){
        res.cookie('data_user', await createCookie(req.session.passport.user), {maxAge:60*10000, httpOnly: false})
    }else if(!req.isAuthenticated()){
        res.clearCookie("data_user");
    }
    let productos = BD_Productos.getAll();
    res.render('main',{layout : 'index', 'productos': productos});
});

Router.get('/auth/twitter/registration', (req, res) => {
    res.render('main', {layout: 'twitter_registration'});
});

Router.post('/auth/twitter/registration', (req, res) => {

});
//======================
//FAILS
Router.get('/fail_login', (req, res) =>{
    res.render('main',{layout: 'error_template', err: true});
});

Router.get('/fail_register', (req, res) =>{
    res.render('main',{layout: 'error_template', err: false});
});
//=======================
//REGISTER AND LOGIN
Router.post('/register', Passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: 'fail_register'
}));

Router.post('/login', checkAutentication, Passport.authenticate('login',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));

Router.get('/auth/twitter', Passport.authenticate('twitter'));

Router.get('/auth/twitter/login', Passport.authenticate('twitter',{
    successRedirect: '/auth/twitter/registration',//YA REGISTRA LOS DATOS, SOLO FALTA HACER QUE HAGA EL LOGIN CON ESOS DATOS Y COMPLETAR EL FORMULARIO
    failureRedirect: '/fail_login'
}));
//======================
//LOGOUT
Router.get('/logout', (req, res) =>{
    req.logOut(function(err){
        if(err)return next(err);
    });
    res.redirect('/');
});

module.exports = { Router };
