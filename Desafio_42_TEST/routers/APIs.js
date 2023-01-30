/* REQUIRES */
const express = require('express');
const { check_API_Autentication } = require('./middlewares/Authentication');
const controller = require('./controllers/API_Router.controller');
const Passport = require('passport');
/* CONST Y MIDDLEWARES */
const API = express.Router();
API.use(express.json());


/* APIs */

API.get('/products-view', controller.productsView);

/* PRODUCTOS */
API.get('/products', controller.products);

API.get('/product/:id', controller.productID);

API.post('/product', controller.setProduct);

API.delete('/product/:id', controller.deleteProduct);
/* USUARIO */

API.get('/users', controller.users);

API.post('/register', controller.PassportCreateUser, controller.setUser);

API.get('/user/:id', controller.userID);

API.delete('/user', controller.deleteUser);

API.get('/random', controller.random);

API.get('/login/', controller.checkLogin);

API.get('/SessionisActive/', check_API_Autentication, controller.checkSession);



module.exports = { API }