const mongoose = require("mongoose");
const { ProductsModel } = require('../../models/PorductosModel');


class ProductosMongo{

    /**
     * It connects to the database.
     */
    instance
    constructor(){
        this.url = process.env.MONGODB_URI;
        this.mongodb = mongoose.connect;
    }


    /**
     * It connects to the database, gets all the messages, gets all the authors, and then normalizes
     * the data.
     * @returns An array of objects.
     */
    async getAll(){
        try{
            console.log("leyendo Base de Datos");
            this.mongodb(this.url);
            return await ProductsModel.find().lean();
        }catch(err){
            console.log(err);
            return false;
        }
    }

    /**
     * It connects to the database, then it searches for a document with the given id, if it doesn't
     * find it, it throws an error, if it finds it, it returns the document.
     * @param id - The id of the document to be retrieved.
     * @returns The document with the id that was passed as a parameter.
     */
    async getById(id){
        try{
            this.mongodb(this.url);
            const doc = await ProductsModel.findById(id).lean();
            if(doc==null){throw new Error()}
            return doc;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async generateID(){
        try{
            this.mongodb(this.url);
            const doc = await ProductsModel.find({},{"_id":true}).sort({_id:-1}).limit(1).lean();
            if(doc.length == 0){return 0};
            return doc[0]._id+1;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    /**
     * It creates a new carrito (cart) in the database.
     * @returns The newCarrito object is being returned.
     */
    async setProduct(product){
        try{
            const new_id = await this.generateID();
            product._id = new_id;
            this.mongodb(this.url);
            const newCarrito = new ProductsModel(product);
            return await newCarrito.save()
        }catch(err){
            console.log(err);
            return false;
        }
    }

    /**
     * It deletes a row from a JSON file
     * @param id - The id of the cart to be deleted
     * @returns an array with two elements. The first element is a boolean that indicates if the
     * operation was successful or not. The second element is the error message if the operation was
     * not successful.
     */
    async deleteByID(id) {
        try{
            this.mongodb(this.url);
            await ProductsModel.findByIdAndDelete(id);
            return true;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    /**
     * It takes a date object and returns a string in the format dd/mm/yyyy.
     * @param date - The date object to be formatted.
     * @returns The date in the format dd/mm/yyyy
     */
    setTimestamp(date) {
        return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    }

    static returnSingleton(){
        if(!this.instance){
            this.instance = new ProductosMongo();
        }
        return this.instance;
    }
}

module.exports = { ProductosMongo };