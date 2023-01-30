const { BD_Autores } = require('../../DB/DAOs/Mongo/Autores.daos');
const { AutoresDTO } = require('../../DB/DTO/AutoresDTO');

const serviceAutores = {
    getAllSrv: async () => {
        const autores = await BD_Autores.getAll();
        const autoresDTO = autores.map((autor) => new AutoresDTO(autor));
        return autoresDTO;
    },
    getByIdSrv: async (id) => {
        const autor = await BD_Autores.getById(id);
        const autorDTO = new AutoresDTO(autor);
        return autorDTO;
    },
    deleteByIdSrv: async (id) => {
        const status = await BD_Autores.deleteByID(id);
        return status;
    }
};

module.exports = { serviceAutores };