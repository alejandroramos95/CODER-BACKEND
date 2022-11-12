/* IMPORTACIONES POR NPM */
const express = require("express");
const session = require('express-session');
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const Handlebars = require("handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
/* IMPORTACIONES LOCALES */
const { Router } = require('./Routers/main_routers');
const { API } = require('./Routers/APIs');
const { BD_Mensajes } = require('./DB/DAOs/Mensajes.daos');
const {BD_Productos } = require('./DB/DAOs/Productos.Faker');
const { BD_Autores } = require('./DB/DAOs/Autores.daos');
const { Normalizer } = require('./DB/Normalizer/Normalizr');
const MongoStore = require('connect-mongo');
/* CREACION DE CONSTANTES */
const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const sessionStore = MongoStore.create({
	mongoUrl: 'mongodb+srv://Admin23:ProyectoCoder@backend-coderhouse.r8d7zxk.mongodb.net/eCommerce_Login',
	ttl: 10*60/* MINUTOS*SEGUNDOS */,
})

/* MIDDLEWARES */
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
	handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(session({
	store: sessionStore,
	secret: 'J9dsY1xLJ9',
	resave: false,
	saveUninitialized: false,
}))
app.use('/api/' ,API);
app.use('/', Router);
/* WEBSOCKET */
io.on("connection", async(socket) => {
    console.log("USUARIO CONECTADO");
	socket.emit("productos", BD_Productos.getAll());
	socket.emit('mensaje', Normalizer.denormalize(await BD_Autores.getAll(), await BD_Mensajes.getAll()));
	
	socket.on("nuevo-producto", async(data) => {
		BD_Productos.setProduct(data);
		io.sockets.emit("productos", BD_Productos.getAll());
	});

	socket.on('nuevo-mensaje', async(data) => {
		if(data != null){
			await BD_Mensajes.setMessage(data);
		}
		io.sockets.emit('mensaje', Normalizer.denormalize(await BD_Autores.getAll(), await BD_Mensajes.getAll()));
	});

	socket.on('nuevo-usuario', async (data) => {
		await BD_Autores.createAuthor(data);
	});
});
/* ESCUHAR AL SERVIDOR */
httpServer.listen(PORT, () => {
	console.log("servidor iniciado en: http://localhost:"+PORT);
});