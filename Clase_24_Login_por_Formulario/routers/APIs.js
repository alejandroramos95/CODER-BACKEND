const express = require('express');
const API = express.Router();
API.use(express.json());

const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos');

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
        const user = await BD_Autores.getById(response.ID);
        req.session.username = user.nickname;
        req.session.password = user.password;
        req.session.email = user.email;
        req.session.name = user.name;
        req.session.last_name = user.last_name;
        req.session.age = user.age;
        req.session.nickname = user.nickname;
        req.session.avatar = user.avatar;
        res.json({status: response.status, data_user: req.session});
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