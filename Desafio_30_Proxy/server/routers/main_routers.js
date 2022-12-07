const express = require('express');
const Router = express.Router();
const Passport = require('passport');
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos')
const yargs = require('yargs');
const args = yargs(process.argv.slice(2))
.alias({m: 'mode',p: 'port',d: 'debug'}).default({mode: "prod",port: 8080,debug: false}).argv
Router.use(express.json());
/* FUNCIONES */
function checkAutentication(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/fail_login');
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

function info_data(){
    return {
        PORT: args.p,
        OS: process.platform,
        NODE_V: process.version,
        MEMORY: process.memoryUsage.rss()/1e+6,
        PATH: process.cwd(),
        PROCESS_ID: process.pid,
        ABSOLUTE_PATH: process.argv[1]
    }
}

/* ROUTERS */
Router.get('/', async(req, res) =>{
    if(req.isAuthenticated() && req.cookies.data_user === undefined){
        res.cookie('data_user', await createCookie(req.session.passport.user), {maxAge:60*10000, httpOnly: false})
    }else if(!req.isAuthenticated()){
        res.clearCookie("data_user");
    }
    let productos = BD_Productos.getAll();
    res.render('main',{layout : 'index', 'productos': productos});
});

Router.get('/info', (req, res)=>{
    console.log('nueva petición');
    info = info_data();
    res.render('main',{layout : 'info', 'data':info});
});

/* FAIL SESSION */
Router.get('/fail_login', (req, res) =>{
    res.render('main',{layout: 'error_template', err: true});
});

Router.get('/fail_register', (req, res) =>{
    res.render('main',{layout: 'error_template', err: false});
});

/* SESSION */
Router.post('/register', Passport.authenticate('signup',{
    successRedirect: '/',
    failureRedirect: 'fail_register'
}));

Router.post('/login', checkAutentication, Passport.authenticate('login',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));

Router.get('/logout', (req, res) =>{
    req.logOut(function(err){
        if(err)return next(err);
    });
    res.redirect('/');
});

module.exports = { Router };
