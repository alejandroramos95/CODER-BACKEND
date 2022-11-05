const { normalize, denormalize, schema } = require('normalizr');

const authorSchema = new schema.Entity('authors', {}, { idAttribute: 'UID' });
const messageSchema = new schema.Entity('message', {author: authorSchema});
const Normalizado = {messages:[messageSchema]};


class Normalizr{

    constructor(){
        this.compresion = 0;
    }

    denormalize(data){
        return denormalize(data.result, Normalizado, data.entities);
    }

    async normalizar(autores, messages){
        const messages_json = {messages: []}
        for (let index = 0; index < autores.length ; index++) {
            messages.map((mensaje) => {
                if(mensaje.UID === autores[index].UID){
                    messages_json.messages.push({
                        id: mensaje._id,
                        author: autores[index],
                        text: mensaje.text,
                        dateTime: mensaje.dateTime
                    });
                }
            }); 
        }
        const normalizado = normalize(messages_json, Normalizado);
        const longNormalizado = JSON.stringify(normalizado).length; //Longitud normalizado
        const longOriginal = JSON.stringify(messages_json).length; //Longitud original sin normalizar
        this.compresion = Number(((longNormalizado*100)/longOriginal).toFixed(2));
        return normalizado;
    }

    /**
     * It returns an object with a property called "compresion" and the value of that property is the
     * value of the "compresion" property of the object that the function is a method of.
     * @returns The object literal {compresion: this.compresion}
     */
    getlvlCompression(){
        return {compresion: this.compresion};
    }
}

const Normalizer = new Normalizr()

module.exports = { Normalizer }