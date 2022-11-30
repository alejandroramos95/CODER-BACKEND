
class Normalizer_Class{

    constructor(){
        this.compresion = 0;
    }

    denormalize(autores, messages){
        const messages_json = {messages: []}
        for (let index = 0; index < autores.length ; index++) {
            messages.map((mensaje) => {
                if(mensaje.email === autores[index].email){
                    messages_json.messages.push({
                        id: mensaje._id,
                        author: autores[index],
                        text: mensaje.text,
                        dateTime: mensaje.dateTime
                    });
                }
            }); 
        }
        /* Sorting the messages by id. */
        messages_json.messages.sort((a, b) => {
            if(a.id > b.id){
                return 1;
            }else{
                return -1;
            }
        });
        return messages_json;
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

const Normalizer = new Normalizer_Class()

module.exports = { Normalizer };