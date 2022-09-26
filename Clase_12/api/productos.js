class Productos{

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

module.exports = Productos;