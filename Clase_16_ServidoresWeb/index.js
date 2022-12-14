const { response, application } = require('express');
const fs = require('fs');
const express = require('express');
const app = express();
const error_0 = "El archivo no existe en el directorio";
const error_1 = "Se ha generado un error, compruebelo en el archivo log.txt generado";

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.get('/products', (req, res) => {
    test = async () => {
        await file.getAll().then( (data) => {
            res.send(data);
        });
    };
    test();
});

app.get('/products-random', (req, res) => {
    let id = parseInt(Math.random()*5);
    console.log(id);
    test = async () => {
        await file.getById(id).then( (data) => {
            res.send(data);
        });
    };
    test();
});

class Contenedor {
    constructor(filename){
        this.filename = filename;
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.filename, "utf8");
            return data.toString();
        }catch(e){
            this.log(e);
            return `${error_0}`;
        }
    }

    async getById(id){
        try{
            const data = await this.getAll();
            if(data==(error_0)){return `${error_0}`;}
            let json = JSON.parse(data).find(child => parseInt(child.id) == id);
            if(typeof json=="undefined"){
                return `No se encontró un objeto con el ID: ${id}`;
            }
            console.log(`Se encontró el objecto con el ID: ${id}`);
            return JSON.stringify(json, null, 2);
        }catch(e){
            this.log(e);
            return `${error_1}`;
        }
    }

    log(e){
        let date = new Date();
        let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        fs.promises.appendFile("log.txt", "\n\n"+current_time.toString()+"\n");
        fs.promises.appendFile("log.txt", e.toString());
    }
}

const file = new Contenedor("products.json");