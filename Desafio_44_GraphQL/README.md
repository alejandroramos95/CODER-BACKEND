# Iniciar el servidor
Iniciar el servidor con: <code>node server.js</code>

## Observaciones
GraphQL esta aplicado a los productos, ya no se usa socketIO.

## Consultas
Para realizar las consultas actualizar y delete se debe de realizar desde Postman o cualquier plataforma de API enviando el **BODY como JSON**.

### Acualizar
```
{
    "operationName": "deleteProducto",
    "query": "mutation deleteProducto { deleteProducto (id:0){title} }"
}
```
### Acualizar
```
{
    "operationName": "updateProducto",
    "query": "mutation updateProducto { updateProducto (id:1, datos: {title: \"Doritos sabor queso\",price:1.2,thumbnail: \"https://e39a9f00db6c5bc097f9-75bc5dce1d64f93372e7c97ed35869cb.ssl.cf1.rackcdn.com/42494462_2-K2UQYpXf-medium.jpg\"}){title} }"
}
```
