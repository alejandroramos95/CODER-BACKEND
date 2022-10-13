const { options } = require('../connection_mdb');
const knex = require('knex')(options);

const values = [
    { 
        tittle: "Photoshop", 
        price: 200, 
        thumbnail: 'https://bit.ly/3RXQBHd'
    }
];

knex('products').insert(values)
    .then(() => console.log({status: 'OK'}))
    .catch(err => {
        console.log({status: 'ERROR', description: err});
        throw err;
    }).finally(() => knex.destroy());