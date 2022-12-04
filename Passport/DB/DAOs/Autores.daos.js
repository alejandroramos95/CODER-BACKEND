const mongoose = require("mongoose");
const { Author_Local_Model } = require("../models/Autores_Local_Model");
const { TwitterAuthorModel } = require("../models/TwitterModel");
const { GitHubAuthorModel } = require("../models/GitHubModel");
const { GoogleAuthorModel } = require("../models/GoogleModel");

class Autores{

    /**
     * It connects to the database.
     */
    constructor(){
        this.url = process.env.MONGODB_URI;
        this.mongodb = mongoose.connect;
    }

    /**
     * It connects to the database, then it returns all the documents in the collection.
     * @returns The result of the query.
     */
    async getAll(){
        try{
            this.mongodb(this.url);
            const data = await Author_Local_Model.find().lean();
            await TwitterAuthorModel.find().lean().then((docs)=>{
                docs.forEach((doc)=>{
                    data.push(doc);
                })
            });
            await GitHubAuthorModel.find().lean().then((docs)=>{
                docs.forEach((doc)=>{
                    data.push(doc);
                })
            })
            await GoogleAuthorModel.find().lean().then((docs)=>{
                docs.forEach((doc)=>{
                    data.push(doc);
                })
            })
            return data;
        }catch(err){
            console.log(err);
            return false;
        }
    }

    /**
     * It checks if the email is already in use by a local user, a GitHub user, or a Twitter user.
     * @param email - email
     * @returns A boolean value.
     */
    async checkEmail(email){
        try{
            this.mongodb(this.url);
            //Recordemos que cualquier valor que no sea null, undefined, 0, false, NaN, o una cadena vacía, se evalúa como true.
            if(
                !await Author_Local_Model.findOne({email: email}).lean() && 
                !await GitHubAuthorModel.findOne({email: email}).lean() && 
                !await TwitterAuthorModel.findOne({email: email}).lean() &&
                !await GoogleAuthorModel.findOne({email: email}).lean()
            )
                return true;
            return false;
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

const BD_Autores = new Autores();

module.exports = { BD_Autores };