const { options } = require('../connection_sql3');
const knex = require('knex')(options);

const values = [
    {
      "message": "Hola mundo!",
      "email": "user@user.com",
      "dateTime": "27/9/2022, 20:32:15",
      "UID": "7aNqOLtd6a6bC57MAAAF"
    }
];

knex('messages').insert(values)
    .then(() => console.log({status: 'OK'}))
    .catch((err) => {
        console.log({status: 'ERROR', description: err});
        throw err;
    }).finally(() => knex.destroy());