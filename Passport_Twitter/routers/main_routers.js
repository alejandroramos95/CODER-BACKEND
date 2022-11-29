const express = require('express');
const Router = express.Router();
const Passport = require('passport');
Router.use(express.json());
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos')
const { BD_Autores_Twitter } = require('../DB/DAOs/Autores_Twitter.daos')

/* FUNCIONES */
function checkAutentication(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/');
    }else{
        next();
    }
}

async function createCookie(id){
    const data_user = typeof id === 'number' ? await BD_Autores_Twitter.getById(id) : await BD_Autores.getById(id);
    delete data_user._id;
    delete data_user.__v;
    delete data_user.password;
    console.log(data_user);
    return data_user;
}

/* ROUTERS */
Router.get('/', async(req, res) =>{
    console.log("Esta autenticado: "+req.isAuthenticated());
    if(req.isAuthenticated() && req.cookies.data_user === undefined){
        if(await BD_Autores_Twitter.isNewUser(req.session.passport.user)){
            res.redirect('/auth/twitter/registration');
            return;
        }else{
            res.cookie('data_user', await createCookie(req.session.passport.user), {maxAge:60*10000, httpOnly: false})
        }
    }else if(!req.isAuthenticated()){
        res.clearCookie("data_user");
    }
    let productos = BD_Productos.getAll();
    res.render('main',{layout : 'index', 'productos': productos});
});

Router.get('/auth/twitter/registration', async(req, res) => {
    if(req.isUnauthenticated())
        res.redirect('/');
    else{
        const user_data = await BD_Autores_Twitter.getById(req.session.passport.user);
        res.render('main', {layout: 'twitter_registration', user_data: user_data});
    }
});

Router.post('/auth/twitter/registration', async(req, res) => {
    req.body.id = req.session.passport.user;
    await BD_Autores_Twitter.completeDatauser(req.body);
    res.redirect('/');
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
    successRedirect: '/',
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
