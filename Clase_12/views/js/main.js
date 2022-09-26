const socket = io.connect();

socket.on("messages", (data) => {
    footer(data);
});

function footer(data){
    fetch('/',{
    method: 'POST'
    }).then(function (html) {
    return html.text();
    }).then(function (footer) {
    render(data, footer);
    }).catch(function (error) {
    console.log(error);
    });
}

function render(data, footer) {
    
    const html = data.map((elemento) => {
        return `<tr>
        <td>${elemento.id}</td>
        <td>${elemento.tittle}</td>
        <td>${elemento.price}</td>
        <td><img src='${elemento.thumbnail}' height=50 width=50></td>
        </tr>`;
    }).join("\n");
    
    var parser = new DOMParser();
    var doc = parser.parseFromString(footer, 'text/html');
    
    try{
    if(doc.getElementById('content').innerHTML == 'No hay productos que mostrar'){
        document.getElementById('container').innerHTML = doc.body.innerHTML;
        console.log('MUNDO');
    }
    }catch{
    doc.getElementById('products-container').innerHTML = html;
    console.log('HOLA');
    document.getElementById('container').innerHTML = doc.body.innerHTML;
    }  
}

function addMessage(e) {
    const mensaje = {
    tittle: document.getElementById("tittle").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    };

    console.log(mensaje);
    socket.emit("new-message", mensaje);
    return false;
}