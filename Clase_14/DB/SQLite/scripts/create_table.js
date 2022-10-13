const { options } = require('../connection_sql3');
const knex = require('knex')(options);

knex.schema.createTable('messages', table => {
    table.increments('id')
})
.then(() => console.log({status: 'OK'}))
.catch((err) => {
    console.log({status: 'OK', description: err}); 
    throw err;
})
.finally(() => { 
    knex.destroy()
});