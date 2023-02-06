/*========================PRODUCTOS===================================*/
let TableisCreated = false;

const config = (graphqlQuery) => { 
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(graphqlQuery),
    }
}

function getProducts(){
    fetch('/api/graphql', config({query: "query { getProductos { title, price, thumbnail, _id } }"}))
    .then(response => response.json())
    .then(json => {
        if(json.data.getProductos.length > 0){
            createTable();
            rederProducts(json.data.getProductos)
        }
    })
    .catch(error => console.log(error));
}

function createTable(){
    document.querySelector('#productos-container').innerHTML = 
    `<h1 id="content" style="text-align: center; margin-top: 2cm;">Productos añadidos</h1>
    <table class="table" style="margin-top: 1.5cm;">
        <thead>
            <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Precio</th>
                <th>Imagen</th>
            </tr>
        </thead>
        <tbody id="products-container">
            <tr></tr>
        </tbody>
    </table>`;
    TableisCreated = true;
    return;
}

function rederProducts(products){
    if(!TableisCreated) createTable();
    document.querySelector('#products-container').innerHTML += products.map(product => {
        return `<tr>
            <td>${product._id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>
                <img id="thumbnail-picture" src=${product.thumbnail} height=50 width=50>
            </td>
        </tr>`
    }).join('');
    return;
}



function nuevoProducto(){
    const graphqlQuery = {
        operationName: "createProducto",
        query: `mutation createProducto {
            createProducto (datos: {
                title: "${document.querySelector("#tittle").value}",
                price: ${document.querySelector("#price").value},
                thumbnail: "${document.querySelector("#thumbnail").value}"
            }){
                title,
                price,
                thumbnail,
                _id
            }
        }`,
    };

    console.log(graphqlQuery);

    fetch('/api/graphql', config(graphqlQuery))
        .then(response => response.json())
        .then(json => rederProducts([json.data.createProducto]))
        .catch(error => {
            console.log(error)
            alert("Error al crear el producto");
        });
    
    document.querySelector("#tittle").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#thumbnail").value = "";
    return;
}