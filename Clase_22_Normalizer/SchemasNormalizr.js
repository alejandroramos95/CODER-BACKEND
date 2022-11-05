const {normalize, denormalize, schema} = require('normalizr');
const util =  require('node:util');

/*
const normalize = normalizr.normalize
const denormalize = normalizr.denormalize
const schema = normalizr.schema
*/

const authorSchemaNmlz = new schema.Entity('authors', {}, { idAttribute: 'UID' })
const messageSchemaNmlz = new schema.Entity('message', {
    author: authorSchemaNmlz
})
const messagesSchemaNmlz = {messages:[messageSchemaNmlz]}

const myData ={
    messages:[
    {
        id:1,
        author: {
            UID: 'VuXVygRBIAcQaJsLAAAD',
            email:'correo1@hotmail.com',
            name: 'nombre1',
            apellido: 'apellido1',
            edad: 10,
            alias: 'alias1',
            avatar: 'http://avatar1.jpg'
        },
        text: 'texto 1'
    }, 
    {
        id:2,
        author: {
            UID: 'fneiwjfFCSMiscniWSWN',
            email:'correo2@hotmail.com',
            name: 'nombre2',
            apellido: 'apellido2',
            edad: 20,
            alias: 'alias2',
            avatar: 'http://avatar2.jpg'
        },
        text: 'texto 2'
    }, 
    {
        id:3,
        author: {
            UID: 'bfWFNCWncisNCJSCNknC',
            email:'correo3@hotmail.com',
            name: 'nombre3',
            apellido: 'apellido3',
            edad: 30,
            alias: 'alias3',
            avatar: 'http://avatar3.jpg'
        },
        text: 'texto 3'
    },
    {
        id:4,
        author: {
            UID: 'NIEnciNCDANkncdnvjVD',
            email:'correo2@hotmail.com',
            name: 'nombre2',
            apellido: 'apellido2',
            edad: 20,
            alias: 'alias2',
            avatar: 'http://avatar2.jpg'
        },
        text: 'texto 4'
    }
]
}

const normalizado = normalize(myData, messagesSchemaNmlz);

console.log('=========== NORMALIZADO =================')
console.log(util.inspect(normalizado,false, Infinity))
console.log('=========== DESNORMALIZADO =================')
console.log(util.inspect(denormalize(normalizado.result, messagesSchemaNmlz, normalizado.entities),false, Infinity))

/*
email:{type: String, required: true},
	name: {type:String, required:true},
	apellido:{type:String, required:true},
	edad:{type:Number},
	alias:{type:String},
	avatar:{type:String}

    author:{type: authorSchema, required: true},
	text:{type:String, required:true}
    */
