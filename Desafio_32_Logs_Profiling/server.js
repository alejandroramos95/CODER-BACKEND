/* IMPORTACIONES POR NPM */
require('dotenv').config();
const express = require("express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { engine } = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const { Server: HttpServer } = require("http");
const Handlebars = require("handlebars");
const MongoStore = require('connect-mongo');
const Passport = require('passport');
const yargs = require('yargs');
const pino = require('pino');
/* IMPORTACIONES LOCALES */
const { Strategy } = require('./DB/Passport/Passport');
const { Router } = require('./routers/main_routers');
const { API } = require('./routers/APIs');
const { logger } = require('./Pino/pino');
/* CREACION DE COMANDOS */
const args = yargs(process.argv.slice(2)).alias({
	m: 'mode',
	p: 'port',
	d: 'debug'
}).default({
	mode: "prod",
	port: 8080,
	debug: false
}).argv
/* CREACION DE CONSTANTES */
const PORT = args.p;
const app = express();
const httpServer = new HttpServer(app);
const sessionStore = MongoStore.create({
	mongoUrl: process.env.MONGODB_URI,
	ttl: 10*60/* MINUTOS*SEGUNDOS */,
})
const console_logger = pino({
	transport:{target: 'pino-pretty'}, 
	options:{colorize: true}
});
console_logger.level = 'warn';
/* MIDDLEWARES */
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(cookieParser(process.env.SECRET_COOKIE_KEY));
app.use(session({
	name: 'credentials_session',
	store: sessionStore,
	secret: process.env.SECRET_COOKIE_KEY,
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
app.use((req, res)=>{
	res.status(400).render('main', {layout: '404'});
	logger.warn('Ruta incorrecta: '+req.url);
	console_logger.warn('Ruta incorrecta: '+req.url);
});
require('./SocketIO/socket').getIO(httpServer);
/* ESCUHAR AL SERVIDOR */
httpServer.listen(PORT, () => {
	console.log("servidor iniciado en: http://localhost:"+PORT);
});