const { BD_Mensajes } = require('../DB/DAOs/Mensajes.daos');
const {BD_Productos } = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos');
const { Normalizer } = require('../DB/Normalizer/Normalizr');
const { Server: IOServer } = require("socket.io");
/* WEBSOCKET */
module.exports = {
	getIO: (httpServer) => {
        const io = new IOServer(httpServer);
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

            socket.on('checkEmail', async (email) => {
                socket.emit('response-checkEmail', email!=null ?await BD_Autores.checkEmail(email):false);
            });
        });
    }
}