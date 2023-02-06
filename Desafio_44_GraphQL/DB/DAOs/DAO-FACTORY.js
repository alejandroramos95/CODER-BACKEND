require('dotenv').config();
const args = require('../../Resources/yargs');
const { ProductosFS } = require('./File/Productos.File');
const { ProductosMongo } = require('./Mongo/Productos.daos');

class DAOFactory{
    returnDBConnection(){
        console.log("DB: "+args.storage.toUpperCase());
        switch(args.storage.toUpperCase()){
            case 'FS': return ProductosFS.returnSingleton();
            case 'MONGO': return ProductosMongo.returnSingleton();
            default: return ProductosFS.returnSingleton();
        }
    }
}

module.exports = new DAOFactory();