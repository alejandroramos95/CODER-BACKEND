const { faker } = require('@faker-js/faker');

class Productos{
    
    constructor(){
        this.products = [];
        this.generate();
    }
    

    getAll(){
        return this.products;
    }

    setProduct(product){
        try{
            product.id = this.products.length;
            this.products.push(product);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    generate(){
        for(let i=0; i<6; i++){
            this.products.push({
                id: this.products.length,
                tittle: faker.commerce.productName(),
                price: faker.commerce.price(),
                thumbnail: faker.image.imageUrl(64, 64, 'food', true)
            });
        }
    }
}

const BD_Productos = new Productos();

module.exports = { BD_Productos };