const { buildSchema } = require('graphql');

const ProductoSchema = buildSchema(`
    input ProductoInput {
        title: String,
        price: Float,
        thumbnail: String
    }
    type Producto {
        _id: ID!,
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        getProductos: [Producto],
    }
    type Mutation {
        createProducto(datos: ProductoInput): Producto,
        updateProducto(id: ID!, datos: ProductoInput): Producto,
        deleteProducto(id: ID!): Producto
    }
`)

module.exports = { ProductoSchema };