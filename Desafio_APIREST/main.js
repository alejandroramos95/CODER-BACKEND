//VOID MAIN
const express = require('express');
const products = express.Router();

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use(require('./routers/RouterProductos'))

const server = app.listen(PORT, () => {
    console.log('listening on port '+PORT);
});


//APPS
app.use('/', (request, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.use('/api/productos', products);
