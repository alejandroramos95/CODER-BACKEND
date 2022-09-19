const express = require('express');
const multer = require('multer');
const path=require('path');
const products = express.Router();

let oneStepBack=path.join(__dirname,'../');

class Productos {
    productos = [];

    getAll(){
        return this.productos;
    }

    setProduct(body){
        let status= -1;
        try{
            let id_count = 0;
            if(this.productos.length > 0) {
                id_count = parseInt(this.productos[this.productos.length-1].id);//TRAE EL ID DEL OBJETO EN EL ULTIMO ELEMENTO DEL ARRAY
                id_count++;
            }
            if(this.validateBody(body)){
                let temp = body;
                temp["id"] = id_count;
                this.productos.push(temp);
            }else{
                throw new Error();
            }
            return status = 1;
        }catch{
            return status;
        }
    }

    validateBody(body){
        let status = false;
        try{
            if(!body.tittle){throw new Error("Falta un elemento en el valor de una llave en el objeto")};
            if(!body.price){throw new Error("Falta un elemento en el valor de una llave en el objeto")};
            if(!body.thumbnail){throw new Error("Falta un elemento en el valor de una llave en el objeto")};
            return status = true;
        }catch(e){
            console.log(e);
            return status;
        }
    };
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

products.get('/', (request, res) => {
    res.sendFile(oneStepBack+'/public/html/index.html');
});

products.get('/productos', (request, res) => {
    const datos = elements.getAll();
    const index = 1;
    const method = request.method;

    res.render("products-list", {'datos': datos, 'index': false, 'method': false});
});

products.post('/productos', upload.single("thumbnail"), (request, res, next) => {
    const file = request.file;
    console.log(request.body);
    const datos = elements.getAll();
    const method = request.method;

    let index = elements.setProduct(request.body);
    index != -1
        ? res.render("products-list", {'datos': datos, 'index': true, 'method': true})
        : res.render("products-list", {'datos': datos, 'index': false, 'method': true});
});

const elements = new Productos();
module.exports = products;