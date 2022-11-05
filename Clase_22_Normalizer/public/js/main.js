
const socket = io.connect();

let author = {};

socket.on("productos", (data) => {
    footer(data);
});

socket.on('mensaje', (data) => {
    renderMessage(data);
})

function footer(data){
    fetch('/api/products',{
        method: 'GET',
    }).then(function (html) {
        return html.text();
    }).then(function (footer) {
        renderProduct(data, footer);
    }).catch(function (error) {
        console.log(error);
    });
}

function getlvlCompression(){
    return fetch('/api/lvlcompression',{method: 'GET',})
    .then((data) => {return data.json()})
    .then((json) => {return json});
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

async function renderMessage(chat){    
    console.log(chat.messages);
    const html = chat.messages.map((elemento) => {
    if(elemento.author.UID == socket.id){
        return `
            <div class="media media-chat media-chat-reverse">
            <div class="media-body">
                <p>${elemento.text}</p>
                <p class="meta"><time datetime="2018">${elemento.dateTime}</time></p>
                <p class="meta">${elemento.author.email}</p>
            </div>
            </div>`;
    }else{
        return `
            <div class="media media-chat">
            <img class="avatar" src="${elemento.author.avatar}" alt="Image">
            <div class="media-body">
                <p>${elemento.text}</p>
                <p class="meta"><time datetime="2018">${elemento.dateTime}</time></p>
                <p class="meta">${elemento.author.email}</p>
            </div>
            </div>`;
    }
    }).join('\n');
    document.getElementById('chat-content').innerHTML=html;
    document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').scrollHeight;
    try{
        const porcentaje = await getlvlCompression();
        document.getElementById('lvl_compression').innerHTML = '(Compresión: '+porcentaje.compresion+'%)';
    }catch(e){
        console.log(e);
    }
}

function addMessage(e){
    let temp = e;
    if(temp.replace(/\s/g, '').length != 0){
        const message = {
            UID: socket.id,
            text: e,
            dateTime: new Date().toLocaleString('es-PE'),
        }
        document.getElementById('send-message').value = "";
        socket.emit('nuevo-mensaje', message);
    }else{
        document.getElementById('send-message').value = "";
    }
}

function enableChat(){

    const html = document.createRange().createContextualFragment(
        `<a id="img-submit" class="publisher-btn text-info" onclick="addMessage(document.getElementById('send-message').value)" data-abc="true">
        <img src="https://www.pngall.com/wp-content/uploads/12/Paper-Plane-Airplane-PNG.png" class="fa fa-paper-plane"></img>
        </a>`
    );
    document.getElementById('user-img').src= author.avatar
    document.getElementById('uchat').appendChild(html);
    document.getElementById('btn-register').remove();
    document.getElementById('send-message').value = '';
    document.getElementById('enable-form').remove();
    document.getElementById('send-message').placeholder = 'Escriba un mensaje';
    const input = document.getElementById('send-message');

    input.addEventListener("keypress", function(event) {
        // Si el usuario presiona enter en el teclado
        if (event.key === "Enter") {
            document.getElementById("img-submit").click();
        }
    });
}

async function createUser(){
    author = {
        UID: socket.id,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        last_name: document.getElementById('last_name').value,
        age: document.getElementById('age').value,
        nickname: document.getElementById('nickname').value,
        avatar: document.getElementById('avatar').value,
    }
    try{
        await loadImage(author.avatar)
    }catch(e){
        author.avatar = "https://img.icons8.com/color/36/000000/administrator-male.png";
    }
    socket.emit('nuevo-usuario', author);
    document.getElementById('close').click();
    document.getElementById('send-message').disabled = false;
    enableChat();
}

/* Esta función no es mía... */
const loadImage = path => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'Anonymous' // to avoid CORS if used with Canvas
      img.src = path
      img.onload = () => {
        resolve(img)
      }
      img.onerror = e => {
        reject(e)
      }
    })
}

window.onload = () => { 
    document.getElementById('close').addEventListener('click', () =>{
        document.getElementById('btn-register').disabled = true;
        document.getElementById('form-warp').classList.remove('fade-in');
        document.getElementById("form-warp").style.visibility="hidden";
    });
    document.getElementById('enable-form').addEventListener('click', () =>{
        document.getElementById('btn-register').disabled = false;
        document.getElementById("form-warp").style.visibility="visible";
        document.getElementById('form-warp').classList.add('fade-in');
    });
    document.getElementById('btn-register').addEventListener('click', () =>{
        const email = document.getElementById('email').value;
        const name = document.getElementById('name').value;
        const last_name = document.getElementById('last_name').value;
        const age = Number(document.getElementById('age').value);
        const nickname = document.getElementById('nickname').value;
        console.log({email, name, last_name, age, nickname})
        if(email.trim()!=0 && name.trim()!=0 && last_name.trim()!=0 && (10<=age && age<=100) && nickname.trim()!=0)
            createUser();
        else{
            console.log('PAYASO!')
            document.getElementById('btn-register').classList.add('shake-enabled');
            setTimeout(() => {document.getElementById('btn-register').classList.remove('shake-enabled')},1100);
        }
    });
}


