const fs = require('fs');

class BD_Productos{

    productos = [];

    getAll(){
        return this.productos;
    }

    setProduct(body){
        let status= false;
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
            return status = true;
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

}

class Chat{

    constructor(){
        this.filename = 'log-message.json';
    }

    getAll() {
        try{
            let data = fs.readFileSync(this.filename, 'utf8');
            if(data == ''){
                fs.writeFileSync(this.filename, "[]")
                return this.getAll();
            }else{
                return JSON.parse(data);
            }
            
        }catch(e){
            this.log(e);
        }
    }

    setMessage(new_data){
        try{
            const data = this.getAll();
            data.push(new_data);
            fs.writeFileSync(this.filename, JSON.stringify(data, null, 2))
            return data;
        }catch(e){
            this.log(e);
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