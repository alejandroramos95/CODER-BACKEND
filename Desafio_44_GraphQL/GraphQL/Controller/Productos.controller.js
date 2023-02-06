const { Producto } = require('../Classes/Productos.class');

const productos = [{
    "_id": 0,
    "title": "Inca-Kola",
    "price": "1.5",
    "thumbnail": "https://www.smartsystem.pe/wp-content/uploads/2020/04/inka-cola-500ml-1.jpg"
},
{
    "title": "Oreo",
    "price": "0.50",
    "thumbnail": "https://awayo.pe/wp-content/uploads/2021/02/Oreo-36-Web.jpg",
    "_id": 1
}];

module.exports = {
    getProductos: () => {
        return productos;
    },
    createProducto: ({ datos }) => {
        const newId = productos.length;
        const producto = new Producto(newId, datos);
        productos.push(producto);
        console.log(productos);
        return producto;
    },
    updateProducto: ({ id, datos }) => {
        const producto = productos.find(producto => producto._id == id);
        if (producto) {
            producto.title = datos.title;
            producto.price = datos.price;
            producto.thumbnail = datos.thumbnail;
        }
        return producto;
    },
    deleteProducto: ({ id }) => {
        const producto = productos.find(producto => producto._id == id);
        if (producto) {
            productos.splice(productos.indexOf(producto), 1);
        }
        return producto;
    }
};
