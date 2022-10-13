const { options } = require('../connection_mdb');
const knex = require('knex')(options);

knex.schema.createTable('products', table => {
    table.increments('id')
})
.then(() => console.log({status: 'OK'}))
.catch(err => {
    console.log({status: 'ERROR', description: err});
    throw err;
})
.finally(() => { 
    knex.destroy()
});