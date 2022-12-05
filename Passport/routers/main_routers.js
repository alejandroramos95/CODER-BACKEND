const express = require('express');
const Router = express.Router();
const Passport = require('passport');
const { BD_Productos } = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos');
const { BD_Autores_Local } = require('../DB/DAOs/Autores_Local.daos');
const { BD_Autores_Twitter } = require('../DB/DAOs/Autores_Twitter.daos')
const { BD_Autores_GitHub } = require('../DB/DAOs/Autores_GitHub.daos')
const { BD_Autores_Google } = require('../DB/DAOs/Autores_Google.daos');
/* MIDDLEWARES */
Router.use(express.json());

/* FUNCIONES */
function checkUnAutentication(req, res, next){
    if(req.isUnauthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        next();
    }else{
        res.redirect('/');
    }
}

async function formComplete(req, res, next){
    let Autor;
    if(req.session.passport.user.linked_account==="Twitter")
        Autor = await BD_Autores_Twitter.getById(req.session.passport.user.id);
    else if(req.session.passport.user.linked_account==="GitHub")
        Autor = await BD_Autores_GitHub.getById(req.session.passport.user.id);
    else if(req.session.passport.user.linked_account==="Google")
        Autor = await BD_Autores_Google.getById(req.session.passport.user.id);
    if(Autor.email && Autor.password){
        res.redirect('/');
    }else{
        next();
    }
}

async function checkLinkedAccount(user){
    if(user.linked_account==="Twitter")
        return await BD_Autores_Twitter.isNewUser(user.id);
    else if(user.linked_account==="GitHub")
        return await BD_Autores_GitHub.isNewUser(user.id);
    else if(user.linked_account==="Google")
        return await BD_Autores_Google.isNewUser(user.id);
}

async function getDataUser(user){
    if(user.linked_account==="Twitter")
        return await BD_Autores_Twitter.getById(user.id)
    else if(user.linked_account==="GitHub")
        return await BD_Autores_GitHub.getById(user.id);
    else if(user.linked_account==="Google")
        return await BD_Autores_Google.getById(user.id);
}

async function createCookie(user){
    let data_user;
    if(user.linked_account==="Twitter"){
        data_user = await BD_Autores_Twitter.getById(user.id);
    }else if(user.linked_account==="GitHub"){
        data_user = await BD_Autores_GitHub.getById(user.id);
    }else if(user.linked_account==="Google"){
        data_user = await BD_Autores_Google.getById(user.id);
    }else{
        data_user = await BD_Autores_Local.getById(user.id);
    }
    delete data_user._id;
    delete data_user.__v;
    delete data_user.password;
    delete data_user.Timestamp;
    delete data_user.linked_account;
    return data_user;
}

async function sendFromData(data_user){
    if(data_user.linked_account==="Twitter")
        await BD_Autores_Twitter.completeDatauser(data_user);
    else if(data_user.linked_account==="GitHub")
        await BD_Autores_GitHub.completeDatauser(data_user);
    else if(data_user.linked_account==="Google")
        await BD_Autores_Google.completeDatauser(data_user);
}

/* ROUTERS */
Router.get('/', async(req, res) =>{
    if(req.isAuthenticated() && req.cookies.data_user === undefined){
        if(typeof req.session.passport.user.id === 'number' && await checkLinkedAccount(req.session.passport.user)){
            res.redirect('/auth/twitter/registration');
            return;
        }else{
            res.cookie('data_user', await createCookie(req.session.passport.user), {maxAge:60*10000, httpOnly: false})
        }
    }else if(req.isUnauthenticated()){
        res.clearCookie("data_user");
    }
    let productos = BD_Productos.getAll();
    res.render('main',{layout : 'index', 'productos': productos});
});

Router.get('/auth/twitter/registration', checkAuthentication, formComplete, async(req, res) => {
    const user_data = await getDataUser(req.session.passport.user);
    res.render('main', {layout: 'twitter_registration', user_data: user_data});
});

Router.post('/auth/twitter/registration', checkAuthentication, async(req, res) => {
    if(await BD_Autores.checkEmail(req.body.email)){
        req.body.id = req.session.passport.user.id;
        req.body.linked_account = req.session.passport.user.linked_account;
        await sendFromData(req.body);
        res.redirect('/');
    }else{
        res.redirect('/fail_register');
    }
    
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
/* LOCAL */
Router.post('/register', checkUnAutentication, Passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: 'fail_register'
}));

Router.post('/login', checkUnAutentication, Passport.authenticate('login',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));
/* TWITTER */
Router.get('/auth/twitter', checkUnAutentication, Passport.authenticate('twitter'));

Router.get('/auth/twitter/login', checkUnAutentication, Passport.authenticate('twitter',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));
/* GITHUB */
Router.get('/auth/GitHub', checkUnAutentication, Passport.authenticate('github'));

Router.get('/auth/GitHub/login', checkUnAutentication, Passport.authenticate('github',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));
/* GOOGLE */
Router.get('/auth/Google', checkUnAutentication, Passport.authenticate('google',{
    scope: ['profile', 'email'], //ES NECESARIO PARA QUE FUNCIONE
}));

Router.get('/auth/Google/login', checkUnAutentication, Passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));
//======================
//LOGOUT
Router.get('/logout', (req, res) =>{
    res.clearCookie('credentials_session');
    req.session.destroy((err) => {
        if(err)console.log(err);
        res.redirect('/');
    });
});

module.exports = { Router };
