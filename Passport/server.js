/* IMPORTACIONES POR NPM */
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const Passport = require('passport');
const yargs = require('yargs');
const { engine } = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const { Server: HttpServer } = require("http");
const Handlebars = require("handlebars");
const MongoStore = require('connect-mongo');
/* IMPORTACIONES LOCALES */
require('./DB/Passport_Strategies/Passport.js');
const { Router } = require('./routers/main_routers');
const { API } = require('./routers/APIs');
/* COMANDOS POR TERMINAL */
const comand = yargs(process.argv.slice(2))
.alias({p: 'port'}).default({port: 8080}).argv
/* CREACION DE CONSTANTES */
const PORT = comand.p;
const app = express();
const sessionStore = MongoStore.create({
	mongoUrl: process.env.MONGODB_URI,
	ttl: 10*60/* MINUTOS*SEGUNDOS */,
})
/* SOCKET.IO */
const httpServer = new HttpServer(app);
require('./SocketIO/Socket').getIO(httpServer);
/* MIDDLEWARES */
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(cookieParser('J9dsY1xLJ9'));
app.use(session({
	name: 'credentials_session',
	store: sessionStore,
	secret: 'J9dsY1xLJ9',
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: 60*10000
	}
}))
app.use(Passport.initialize());
app.use(Passport.session());
app.use(Passport.authenticate('session'));
app.use(express.urlencoded({ extended: true }))
app.use('/api/' ,API);
app.use('/', Router);
app.use('*',(req, res)=>{
	res.status(400).render('main', {layout: '404'});
});
/* ESCUHAR AL SERVIDOR */
httpServer.listen(PORT, () => {
	console.log("servidor iniciado en: http://localhost:"+PORT);
});