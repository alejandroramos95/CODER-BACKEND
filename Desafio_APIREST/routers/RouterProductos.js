const express = require('express');
const multer = require('multer');
const products = express.Router();

class Productos {
    constructor(title, price, thumbnail) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
    };

    productos = [];

    getAll(){
        return this.productos;
    }

    delete(id){
        let index = -1;
        try{
            for (let i = 0; i < this.productos.length; i++) {
                if(this.productos[i].id == id){
                    this.productos = this.productos.filter(element => element.id!=id);//ELIMINA EL ELEMENTO PARA SER REMPLAZADO
                    index = 1;
                    break;
                }
            };
        }finally{
            return index;
        }
    };

    setProduct(body, file){
        let status= -1;
        try{
            if(!file){
                let id_count = 0;
                if(this.productos.length > 0) {
                    id_count = parseInt(this.productos[this.productos.length-1].id);//TRAE EL ID DEL OBJETO EN EL ULTIMO ELEMENTO DEL ARRAY
                    id_count++;
                }
                let temp = body;
                temp["id"] = id_count;
                this.productos.push(temp);
                return status = 1;
            }else{
                let id_count = 0;
                if(this.productos.length > 0) {
                    id_count = parseInt(this.productos[this.productos.length-1].id);//TRAE EL ID DEL OBJETO EN EL ULTIMO ELEMENTO DEL ARRAY
                    id_count++;
                }
                let temp = body;
                temp["id"] = id_count;
                this.productos.push(temp);
                this.productos[this.productos.length-1].thumbnail = file.path;
                return status = 1;
            }
        }catch{
            return status;
        }
    }

    getById(id) {
        let status = -1;
        let data_request;
        try{
            for (let i = 0; i < this.productos.length; i++) {
                if(this.productos[i].id == id){
                    data_request = this.productos[i];
                    status = 1;
                    break;
                }
            };
        }finally{
            return {status, data_request};
        }
    };

    setUpdate(id, body) {
        let status = -1;
        let data_request;
        try{
            for (let i = 0; i < this.productos.length; i++) {
                if(this.productos[i].id == id){
                    let temp = body;
                    this.productos = this.productos.filter(element => element.id!=id);//ELIMINA EL ELEMENTO PARA SER REMPLAZADO
                    temp["id"] = id;//AGREGA ID AL OBJETO
                    this.productos.push(temp);
                    data_request = this.productos[i];
                    status = 1;
                    break;
                }
            };
        }finally{
            return {status, data_request};
        }
    }

};

/* CONFIG STORAGE */

let storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "public/images");
    },
    filename: (request, file, callback) => {
		callback(null, Date.now() + "-" + file.originalname);
	},
});

const upload = multer({storage});

/* ROUTERS */

products.get('/api/productos', (request, res) => {
    res.json(elements.getAll());
});

products.post('/api/productos', upload.single("thumbnail"), (request, res, next) => {
    const file = request.file;
    console.log(request.body);

    if(request.body["OPTION"] == "thumbnail"){
        delete request.body.OPTION//BORRA LA KEY OPTION
        request.body["thumbnail"] = request.body["URL"]
        delete request.body.URL
        if(!file){
            const error = new Error("Ingrese una imagen");
            error.httpStatusCode = 400;
            return next(error);
        }
        let index = elements.setProduct(request.body, file);
        index != -1
            ? res.json({mensaje: "Se agregó correctamente el producto"})
            : res.json({error: "No se pudo agregar el producto"});
    }else{
        delete request.body.OPTION//BORRA LA KEY OPTION
        if(request.body["URL"]){//VERIFICA QUE LA KEY URL EXISTA
            request.body["thumbnail"] = request.body["URL"]
            delete request.body.URL//BORRA LA KEY URL
        }
        let index = elements.setProduct(request.body);
        index != -1
            ? res.json({mensaje: "Se agregó correctamente el producto"})
            : res.json({error: "No se pudo agregar el producto"});
    }
});

products.get('/api/productos/:id', (request, res) => {
    let {status, data_request} = elements.getById(parseInt(request.params.id));
    status != -1
        ? res.json(data_request)
        : res.json({error:"Producto no encontrado"});
});

products.put('/api/productos/:id', (request, res) => {
    let {status, data_request} = elements.setUpdate(parseInt(request.params.id), request.body);
    status != -1
        ? res.json(data_request)
        : res.json({error: "Producto no encontrado"});
});

products.delete('/api/productos/:id', (request, res) => {
    const index = elements.delete(parseInt(request.params.id));
    index != -1
        ? res.json({mensaje: "Producto con ID "+ request.params.id + " Eliminado exitosamente"})
        : res.json({error: "Producto no encontrado"});
});

const elements = new Productos();
module.exports = products;