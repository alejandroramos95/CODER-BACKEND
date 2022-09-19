//VOID MAIN
const express = require('express');
const products = express.Router();

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(require('./routers/RouterProductos'))

const server = app.listen(PORT, () => {
    console.log('listening on port '+PORT);
});

server.on('error', (err) => console.log(`Se generó un error: ${err}`));

//APPS

app.set('view engine', 'ejs');

app.use('/', products);
