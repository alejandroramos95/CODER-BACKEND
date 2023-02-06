const Router = require('express').Router();
const controller = require('./controllers/USER_Router.controller');
const services = require('./services/Functions.services');
const { checkAutentication, checkUnautentication } = require('./middlewares/Authentication');

/* ROUTERS */
Router.get('/', controller.home);

Router.get('/info', controller.info_route);

/* FAIL SESSION */
Router.get('/fail_login', controller.fail_login);

Router.get('/fail_register', controller.fail_register );

/* SESSION */
Router.post('/login', checkAutentication, controller.login);

// Router.post('/register', checkAutentication, controller.register);

Router.get('/logout', checkUnautentication, controller.logout);

module.exports = { Router };
