const mongoose = require("mongoose");
const { MessageModel } = require("../models/MensajesModel");
const { Normalizer } = require('../Normalizer/Normalizr');
const { BD_Autores } = require("./Autores.daos");

class Mensajes{

    /**
     * It connects to the database.
     */
    constructor(){
        this.url = 
        "mongodb+srv://Admin23:ProyectoCoder@backend-coderhouse.r8d7zxk.mongodb.net/Chat_eCommerce";
        this.mongodb = mongoose.connect;
    }


    /**
     * It connects to the database, gets all the messages, gets all the authors, and then normalizes
     * the data.
     * @returns An array of objects.
     */
    async getAll(){
        try{
            await this.mongodb(this.url);
            const messages = await MessageModel.find().lean();
            const autores = await BD_Autores.getAll();
            const DataNormalizada = Normalizer.normalizar(autores, messages);
            return DataNormalizada;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    async generateNewID(){
        try{
            await this.mongodb(this.url);
            const doc = await MessageModel.find({},{"_id":true}).sort({_id:-1}).limit(1);
            return doc[0]._id+1;
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
            await this.mongodb(this.url);
            const doc = await MessageModel.findById(id);
            if(doc==null){throw new Error()}
            return doc;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    /**
     * It creates a new carrito (cart) in the database.
     * @returns The newCarrito object is being returned.
     */
    async setMessage(message){
        try{
            const new_id = await this.generateNewID();
            message._id = new_id;
            await this.mongodb(this.url);
            const newCarrito = new MessageModel(message);
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
            await this.mongodb(this.url);
            await MessageModel.findByIdAndDelete(id);
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
}

const BD_Mensajes = new Mensajes();

module.exports = { BD_Mensajes };