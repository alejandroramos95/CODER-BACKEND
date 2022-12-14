const { options } = require('../connection_mdb');
const knex = require('knex')(options);

knex.schema.table('products', table => {
    table.string('tittle')
    table.decimal('price', 8,2)
    table.string('thumbnail')
}).then(() => console.log({status: 'OK'}))
.catch(err => {
    console.log({status: 'ERROR', description: err});
    throw err;
})
.finally(() => knex.destroy());