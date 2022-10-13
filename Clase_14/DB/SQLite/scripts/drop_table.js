const { options } = require('../connection_sql3')
const knex = require('knex')(options);

knex.schema.dropTable('messages')
.then(() => console.log({status: 'OK'}))
.catch(err => {
    console.log({status: 'ERROR', description: err});
    throw err;
}).finally(() => knex.destroy());