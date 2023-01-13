const { BD_Autores } = require('../../DB/DAOs/Autores.daos');
const yargs = require('yargs');
const { logger } = require('../../Pino/pino');
const pino = require('pino');

/* =============== CONFIGURACIÓN =============== */
const console_logger = pino({
    transport:{
        target: 'pino-pretty'
    }, 
    options:{
        colorize: true
    }
});
console_logger.level = 'info';

const args = yargs(process.argv.slice(2)).alias({
    m: 'mode',
    p: 'port',
    d: 'debug'
}).default(
    {mode: "prod",
    port: 8080,
    debug: false
}).argv

/* =============== FUNCIONES =============== */

async function createCookie(id){
    const data_user = await BD_Autores.getById(id);
    delete data_user._id;
    delete data_user.__v;
    delete data_user.password;
    console.log(data_user);
    console_logger.info("Cookie creada");
    return data_user;
}

function info_data(){
    console_logger.info("Peticion de informacion del servidor");
    return {
        PORT: args.p,
        OS: process.platform,
        NODE_V: process.version,
        MEMORY: process.memoryUsage.rss()/1e+6,
        PATH: process.cwd(),
        PROCESS_ID: process.pid,
        ABSOLUTE_PATH: process.argv[1]
    }
}

async function generateRandom(cantidad){
    const numeros = [];
    const objetoNumeros = [];
    function generarNumeros()  {
        for(i=0; i<cantidad; i++){
            numeros.push(parseInt(Math.random() * cantidad + 1));
        }
        verificar();
    };
    function verificar() {
        let contador = 0;
        let indice;
        for (let j = 1; j <= cantidad;) {
            indice = numeros.indexOf(j);
            if(indice!=-1){
                contador++;
                numeros.splice(indice,1);
            }else{
                objetoNumeros.push({[j]: contador});
                contador = 0;
                j++;
            }
        }
    };
    generarNumeros();
    return objetoNumeros;
}

module.exports = {
    createCookie,
    info_data,
    generateRandom,
    console_logger
}