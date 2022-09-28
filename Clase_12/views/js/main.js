let email;
const socket = io.connect();

socket.on("productos", (data) => {
    footer(data);
});

socket.on('mensaje', (data) => {
    renderMessage(data);
})

function footer(data){
    fetch('/',{
    method: 'POST'
    }).then(function (html) {
    return html.text();
    }).then(function (footer) {
    renderProduct(data, footer);
    }).catch(function (error) {
    console.log(error);
    });
}

function renderMessage(data){    
    const html = data.map((elemento) => {
    if(elemento.UID == socket.id){
        return `
            <div class="media media-chat media-chat-reverse">
            <div class="media-body">
                <p>${elemento.message}</p>
                <p class="meta"><time datetime="2018">${elemento.dateTime}</time></p>
                <p class="meta">${elemento.email}</p>
            </div>
            </div>`;
    }else{
        return `
            <div class="media media-chat">
            <img class="avatar" src="https://img.icons8.com/color/36/000000/administrator-male.png" alt="...">
            <div class="media-body">
                <p>${elemento.message}</p>
                <p class="meta"><time datetime="2018">${elemento.dateTime}</time></p>
                <p class="meta">${elemento.email}</p>
            </div>
            </div>`;
    }
    }).join('\n');
    document.getElementById('chat-content').innerHTML=html;
}

function renderProduct(data, footer) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(footer, 'text/html');

    if(doc.querySelector('h1').id == 'content'){
    document.getElementById('container').innerHTML = doc.body.innerHTML;
    }else{
    document.getElementById('container').innerHTML = doc.body.innerHTML;
    } 
}

function addMessage(e){
    const message = {
    message: e,
    email: email,
    dateTime: new Date().toLocaleString('es-PE'),
    UID: socket.id,
    }
    document.getElementById('send-message').value = "";
    socket.emit('nuevo-mensaje', message);
}

function addProduct() {
    document.getElementById("Form").addEventListener("click", function(e) {
    e.preventDefault();
    });

    const producto = {
    tittle: document.getElementById("tittle").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    };

    document.getElementById("tittle").value = "";
    document.getElementById("price").value = "";
    document.getElementById("thumbnail").value = "";
    socket.emit("nuevo-producto", producto);
    return false;
}

function chat(data){
    email = data;
    console.log(email);
    if(email.includes("@") && email.includes(".")){
    const html = document.createRange().createContextualFragment(`<a class="publisher-btn text-info" onclick="addMessage(document.getElementById('send-message').value)" data-abc="true">
        <img src="https://www.pngall.com/wp-content/uploads/12/Paper-Plane-Airplane-PNG.png" class="fa fa-paper-plane"></img>
        </a>`);
    document.getElementById('uchat').appendChild(html);
    document.getElementById('btn-register').remove();
    document.getElementById('send-message').value = '';
    }else{
    alert("El email ingresado no tiene un formato valido.")
    document.getElementById('send-message').value = '';
    }
}