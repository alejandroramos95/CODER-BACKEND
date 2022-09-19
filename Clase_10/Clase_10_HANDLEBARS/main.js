//VOID MAIN
const express = require('express');
const { engine } = require('express-handlebars');
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

app.engine("hbs",engine({
    extname: ".hbs",
    defaultLayout: "products-list.hbs",
    layoutsDir: __dirname + '/views/',
}));

app.set("view engine", "hbs");
app.set("views", "./views");

app.use('/', products);
