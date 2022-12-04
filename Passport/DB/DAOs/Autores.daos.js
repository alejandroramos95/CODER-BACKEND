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

    async checkEmail(email){
        try{
            this.mongodb(this.url);
            const doc = [];
            await Author_Local_Model.findOne({email: email}).then((docs)=>{
                docs.forEach((element)=>{
                    doc.push(element);
                })
            });
            await TwitterAuthorModel.findOne({email: email}).then((docs)=>{
                docs.forEach((element)=>{
                    doc.push(element);
                })
            });
            await GitHubAuthorModel.findOne({email: email}).then((docs)=>{
                docs.forEach((element)=>{
                    doc.push(element);
                })
            })
            if(doc==null){return true}
            else{return false};
        }catch(err){
            console.log(err);
            return false;
        }
    }
}

const BD_Autores = new Autores();

module.exports = { BD_Autores };