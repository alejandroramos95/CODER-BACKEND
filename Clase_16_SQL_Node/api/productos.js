const fs = require('fs');

class BD_Productos{

    constructor() {
        const { options } = require('../DB/MariaDB/connection_mdb')
        this.knex = require('knex')(options);
    };

    async getAll(){
        return await this.knex.from('products').select('*');
    }

    async setProduct(body){
        let status= false;
        try{
            if(this.validateBody(body)){
                await this.knex('products').insert(body)
                .then(() => status=true)
                .catch((err) => {throw err});
            }
            return status = true;
        }catch{
            return status;
        }
    }

    validateBody(body){
        let status = false;
        try{
            if(!body.tittle){throw new Error("El objeto no tiene titulo")};
            if(!body.price){throw new Error("El objeto no tiene precio")};
            if(!body.thumbnail){throw new Error("El objeto no tiene thumbnail")};
            return status = true;
        }catch(e){
            console.log(e);
            return status;
        }
    };

}

class Chat{

    constructor(){
        const { options } = require('../DB/SQLite/connection_sql3');
        this.knex = require('knex')(options);
    }

    async getAll() {
        try{
            let data;
            await this.knex.from('messages').select('*')
            .then((rows) => {
                data = rows
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
            return data;
        }catch(e){
            this.log(e);
        }
    }

    async setMessage(new_data){
        try{
            await this.knex('messages').insert(new_data)
            .then(() => console.log('success'))
            .catch((err) => {console.log('error'); throw err;});
            return true;
        }catch(e){
            this.log(e);
            return false;
        }
    }

    log(e){
        let date = new Date();
        let current_time = date.getHours()+":"+date.getMinutes()+":"+ date.getSeconds();
        fs.appendFileSync("log.txt", "\n\n"+current_time.toString()+"\n");
        fs.appendFileSync("log.txt", e.toString());
    }
}

module.exports = {BD_Productos, Chat};