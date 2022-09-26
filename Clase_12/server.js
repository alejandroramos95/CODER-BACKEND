const express = require("express");
const { engine } = require("express-handlebars");
const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");

const PORT = 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, () => {
	console.log("servidor iniciado en: http://localhost:"+PORT);
});

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts'
}));

const { Router, BD } = require('./Routers/main_routers');
app.use(Router);

app.use('/', Router);

/* WEBSOCKET */

io.on("connection", (socket) => {
    console.log("USUARIO CONECTADO");
	socket.emit("messages", BD.getAll());

	socket.on("new-message", (data) => {
		BD.setProduct(data);
		io.sockets.emit("messages", BD.getAll());
	});
});