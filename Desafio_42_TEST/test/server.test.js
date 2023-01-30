const { strictEqual, deepStrictEqual } = require('assert');
const axios = require('axios');
const HEADER = {};

/* =============== TESTS-PRODUCTOS =============== */
const mostrarProductos = async () => {
    const response = await axios.get('http://localhost:8080/api/products');
    return response.data;
};

const mostrarProducto = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/product/${id}`)
    return response.data;
};

const crearProducto = async (producto) => {
    const response = await axios.post('http://localhost:8080/api/product', producto)
    return response.data;
}

const borrarProducto = async (id) => {
    const response = await axios.delete(`http://localhost:8080/api/product/${id}`)
    return response.data;
}
/* =============== TESTS-USUARIOS =============== */
const mostrarUsuarios = async () => {
    const response = await axios.get('http://localhost:8080/api/users')
    return response.data;
}

const mostrarUsuario = async (id) => {
    const response = await axios.get(`http://localhost:8080/api/user/${id}`)
    return response.data;
}

const crearUsuario = async (usuario) => {
    const response = await axios.post('http://localhost:8080/api/register', usuario)
    HEADER.sid = response.headers['set-cookie'][0].split(';')[0].split('=')[1];
    return response.data;
}

const borrarUsuario = async () => {
    const response = await axios.delete('http://localhost:8080/api/user', { headers: { cookie: `credentials_session=${HEADER.sid}` } })
    return response.data;
}

describe("Comprobar respuestas de las APIs de los Productos", () => {
    it("Mostrar un arreglo con todos los productos", async() => {
        const response = await mostrarProductos();
        strictEqual(response.length, 2);
        deepStrictEqual(response, [
            {
                "_id": 0,
                "title": "Inca-Kola",
                "price": "1.5",
                "thumbnail": "https://www.smartsystem.pe/wp-content/uploads/2020/04/inka-cola-500ml-1.jpg"
            },
            {
                "title": "Oreo",
                "price": "0.50",
                "thumbnail": "https://awayo.pe/wp-content/uploads/2021/02/Oreo-36-Web.jpg",
                "_id": 1
            }
        ]);
    })
    it("Mostrar el producto con el id 1", async() => {
        const response = await mostrarProducto(1)
        strictEqual(response._id, 1)
        deepStrictEqual(response, {
            "title": "Oreo",
            "price": "0.50",
            "thumbnail": "https://awayo.pe/wp-content/uploads/2021/02/Oreo-36-Web.jpg",
            "_id": 1
        })
    })
    it("Crear un producto", async() => {
        const response = await crearProducto({
            "title": "Jugo Hugo - Durazno",
            "price": "3.25",
            "thumbnail": "http://3.bp.blogspot.com/-llK4f_lUfmU/TcM8mhgzjxI/AAAAAAAAASw/Leaerz2aFkI/s1600/Hugo+durazno.jpg"
        })
        strictEqual(response.status, true)
        deepStrictEqual(response.product, {
            "_id": 2,
            "title": "Jugo Hugo - Durazno",
            "price": "3.25",
            "thumbnail": "http://3.bp.blogspot.com/-llK4f_lUfmU/TcM8mhgzjxI/AAAAAAAAASw/Leaerz2aFkI/s1600/Hugo+durazno.jpg"
        })
    })
    it("Borrar el producto con el id 2", async() => {
        const response = await borrarProducto(2)
        strictEqual(response.status, true)
    })
})

describe("Comprobar respuestas de las APIs de los Usuarios", () => {
    it("Mostrar un arreglo con todos los usuarios", async()=>{
        const response = await mostrarUsuarios();
        strictEqual(response.length, 2);
        deepStrictEqual(response, [
            {
              name: 'Sunao',
              last_name: 'Nakko',
              age: 16,
              nickname: 'Nakko76',
              email: 'nakosunao74@gmail.com',
              avatar: 'https://i.imgur.com/l8Q7qdH.png'
            },
            {
              name: 'Lobo',
              last_name: 'Solitario',
              age: 53,
              nickname: 'Lobo Solitario',
              email: 'lobo_solitario@gmail.com',
              avatar: 'https://i.pinimg.com/736x/51/02/de/5102de37cf8c4f1b49044aefa17be153--anime-wolf-wolves-art.jpg'
            }
          ])
    })
    it("Mostrar usuario por ID específico", async()=>{
        const response = await mostrarUsuario('637ffc98a2c211191fd78c31');
        strictEqual(response.age, 53);
        deepStrictEqual(response, {
            name: 'Lobo',
            last_name: 'Solitario',
            age: 53,
            nickname: 'Lobo Solitario',
            email: 'lobo_solitario@gmail.com',
            avatar: 'https://i.pinimg.com/736x/51/02/de/5102de37cf8c4f1b49044aefa17be153--anime-wolf-wolves-art.jpg'
          })
    })
    it("Crear un usuario", async()=>{
        const response = await crearUsuario({
            "email": "prueba@gmail.com",
            "name": "Mocha",
            "last_name": "Test",
            "age": "53",
            "nickname": "Test con Mocha",
            "avatar": "https://camo.githubusercontent.com/58045a79a69afea4cab1cea6def6d911fba3956cf5fd683addf41c032aa64088/68747470733a2f2f636c6475702e636f6d2f78465646784f696f41552e737667",
            "password": "123"
          })
        strictEqual(response.status, true)
    })
    it("Borrar el usuario creado", async()=>{
        const response = await borrarUsuario();
        strictEqual(response.status, true)
    })
})