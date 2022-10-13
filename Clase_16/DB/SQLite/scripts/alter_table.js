const { options } = require('../connection_sql3');
const knex = require('knex')(options);

knex.schema.table('messages', table => {
    table.string('message')
    table.string('email')
    table.string('dateTime')
    table.string('UID')
}).then(() => console.log({status: 'OK'}))
.catch((err) => {
    console.log({status: 'ERROR', description: err});
    throw err;
})
.finally(() => knex.destroy());