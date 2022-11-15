/* REQUIRES */
const express = require('express');
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos');

/* CONST Y MIDDLEWARES */
const API = express.Router();
API.use(express.json());

/* FUNCIONES */

function loadDataUser(req, DataUser) {
    req.session.username = DataUser.nickname;
    req.session.password = DataUser.password;
    req.session.email = DataUser.email;
    req.session.name = DataUser.name;
    req.session.last_name = DataUser.last_name;
    req.session.age = DataUser.age;
    req.session.nickname = DataUser.nickname;
    req.session.avatar = DataUser.avatar;
}

/* APIs */

API.get('/products', (req, res) =>{
    const productos = BD_Productos.getAll();
    productos.length > 0
	    ? res.render('main',{layout : 'footer_list', 'productos': productos})
        : res.render('main',{layout : 'footer_list'});
});

API.post('/login/', async(req, res) => {
    const credentials = req.body;
    console.log(credentials);
    const response = await BD_Autores.login(credentials);
    if(response.status){
        const DataUser = await BD_Autores.getById(response.ID);
        delete DataUser.last_name;
        loadDataUser(req, DataUser)
        res.json({status: response.status, data_user: req.session})
    }else{
        res.json({status: response.status});
    }
});

API.get('/login/', async (req, res) => {
    req.session.username
        ? res.json(req.session)
        : res.json({status:false});
});

API.get('/SessionisActive/', (req, res) => {
    res.json({status: req.session.username ? true : false});
})

API.get('/logout/', async (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.json({status:false});
        }else{
            res.json({status:true});
        }
    });
});

module.exports = { API }