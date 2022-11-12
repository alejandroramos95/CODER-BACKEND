const regex = /^[a-zA-Z ]{4,30}$/;
const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let jsonResponse;
const socket = io.connect();

let author = {};

socket.on("productos", (data) => {
    footer(data);
});

socket.on('mensaje', (data) => {
    renderMessage(data);
})

/*========================PRODUCTOS===================================*/
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
/*========================MENSAJES===================================*/
async function renderMessage(chat){    
    console.log(chat.messages);
    const html = chat.messages.map((elemento) => {
    if(elemento.author.email == author.email){
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
            <img class="avatar" src="${elemento.author.avatar}" alt="Image" id="avatar-img">
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
}

/**
 * It checks if the user is logged in, if so, it sends the message to the server.
 * @param messageText - the message that the user is sending
 */
async function addMessage(messageText){
    if(await checkLoginAlive()){
        let temp = messageText;
        if(temp.replace(/\s/g, '').length != 0){
            const message = {
                email: author.email,
                text: messageText,
                dateTime: new Date().toLocaleString('es-PE'),
            }
            document.getElementById('send-message').value = "";
            socket.emit('nuevo-mensaje', message);
        }else{
            document.getElementById('send-message').value = "";
        }
    }else{
        alert('Su sesión ya no se encuentra activa');
        reloadPage()
    }
}
/*========================CHAT===================================*/
function enableChat(){

    const html = document.createRange().createContextualFragment(
        `<a id="img-submit" class="publisher-btn text-info" onclick="addMessage(document.getElementById('send-message').value)" data-abc="true">
        <img src="https://www.pngall.com/wp-content/uploads/12/Paper-Plane-Airplane-PNG.png" class="fa fa-paper-plane"></img>
        </a>`
    );
    document.getElementById('user-img').src= author.avatar
    document.getElementById('uchat').appendChild(html);
    document.getElementById('btn-register').removeEventListener('click', register_button);
    document.getElementById('btn-register').remove();
    document.getElementById('send-message').value = '';
    document.getElementById('enable-form').removeEventListener('click', enable_form);
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
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        last_name: document.getElementById('last_name').value,
        age: document.getElementById('age').value,
        nickname: document.getElementById('nickname').value,
        avatar: document.getElementById('avatar').value,
        password: document.getElementById('password').value
    }
    try{
        await loadImage(author.avatar)
    }catch(e){
        author.avatar = "https://img.icons8.com/color/36/000000/administrator-male.png";
    }
    socket.emit('nuevo-usuario', author);
    const credentials ={
        username: author.nickname,
        password: author.password
    }
    console.log(await check_credentials(credentials));
    Login();
}

/**
 * It takes the data from the form and sends it to the server, then the server sends it back to the
 * client and the client saves it in the sessionStorage.
 * 
 */
async function Login(){
    sessionStorage.setItem('saveCache', document.getElementById('check').checked)
    drawOnLogin();
    /* HABILITAR BOTON LOGOUT */
    document.getElementById('logout').addEventListener('click', Logout);
    socket.emit('nuevo-mensaje', null);
    setTimeout(() => {
        alert('se acabó tu tiempo');
        reloadPage()
    }, 10*60*1000/* MINUTOS*SEGUNDOS*MS */)
    enableChat();
}

/**
 * It closes the login modal, enables the send message button, displays the logout button, displays the
 * text_user div and sets the text_user div's innerHTML to the user's nickname.
 * </code>
 */
function drawOnLogin(){
    document.getElementById('close').click();
    document.getElementById('send-message').disabled = false;
    document.getElementById('logout').style.display="block";
    document.getElementById('text_user').style.display="block";
    document.getElementById('text_user').innerHTML=`Sesión iniciada como: ${author.nickname}`;
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
function reloadPage(){
    window.location.reload();
}
/*========================PETICIONES AL SERVIDOR===================================*/
/**
 * It takes a JSON object, sends it to the server, and returns the response from the server
 * @param credentials - {
 * @returns The response from the server.
 */
async function check_credentials(credentials){
    const rawContent = await fetch('/api/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    return await rawContent.json();
}

/**
 * It sends a GET request to the server, which in turn sends a response, which is then processed by the
 * client
 */
 async function Logout(){
    const Response = await fetch('/api/logout',{
        method: 'GET',
    });
    const jsonResponse = await Response.json();
    if(jsonResponse.status){
        alert(`Hasta luego ${author.name}.\n\nCerrando sesión...`);
        sessionStorage.clear();
        reloadPage()
    }else{
        alert('Se generó un error al intenar cerrar la sesión.');
    }
}

/**
 * This function checks if the user is logged in by sending a GET request to the server and returning
 * the response.
 * @returns {
 *     "status": "true"
 * }</code>
 */
async function checkLoginAlive() {
    const Response = await fetch('/api/SessionisActive',{
        method: 'GET',
    });
    const jsonResponse = await Response.json(); 
    return jsonResponse.status;
}

/*===========================COMPONENTES DEL CHAT========================*/
function close_button(){
    document.getElementById('btn-register').disabled = true;
    document.getElementById('btn-login').disabled = true;
    document.getElementById('form-warp').classList.remove('fade-in');
    document.getElementById("form-warp").style.visibility="hidden";
};
function enable_form(){
    document.getElementById('btn-register').disabled = false;
    document.getElementById('btn-login').disabled = false;
    document.getElementById("form-warp").style.visibility="visible";
    document.getElementById('form-warp').classList.add('fade-in');
}
async function login_button(){
    const credentials ={
        username: document.getElementById('username_login').value,
        password: document.getElementById('password_login').value
    }
    console.log(credentials);
    const Response = await check_credentials(credentials);
    if(Response.status){
        author = Response.data_user;
        delete author.cookie;
        Login();
    }else{
        const element_input = document.getElementById('btn-login');
        element_input.classList.add('error_login');
        setTimeout(() => {
            element_input.classList.remove('error_login')
        },1100)
    }
}
async function register_button(){
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const last_name = document.getElementById('last_name').value;
    const age = Number(document.getElementById('age').value);
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;
    console.log({email, name, last_name, age, nickname, password})
    if(
        regex_email.test(email) && (regex.test(name) 
        && name.trim()!=0) && (regex.test(last_name) 
        && last_name.trim()!=0) && (10<=age && age<=100) 
        && nickname.trim()!=0 && (password.trim()!=0)
    )
        createUser();
    else{
        document.getElementById('btn-register').classList.add('shake-enabled');
        setTimeout(() => {document.getElementById('btn-register').classList.remove('shake-enabled')},1100);
        if(!regex_email.test(email)){
            errorEmail();
        }if(!regex.test(name) || name.trim()==0){
            errorName();
        }if(!regex.test(last_name) || last_name.trim()==0){
            errorLast_name();
        }if(!(10<=age && age<=100)){
            errorAge();
        }if(nickname.trim()==0){
            errorNickname();
        }if(password.trim()==0){
            errorPassword();
        }
    }
}
window.onload = async() => { 
    console.log(sessionStorage.getItem('connect.sid'))
    if(await checkLoginAlive()){
        const Response = await fetch('/api/login',{
            method: 'GET',
        });
        author = await Response.json();
        delete author.cookie;
        Login();
    }else{
        document.getElementById('password_login').addEventListener("keypress", function(event) {
            // Si el usuario presiona enter en el teclado
            if (event.key === "Enter") {
                document.getElementById('btn-login').click();
            }
        });
        /* HABILITAR BOTONES FORM */
        document.getElementById('close').addEventListener('click', close_button);
        /* DESHABILITAR BOTONES FORM */
        document.getElementById('enable-form').addEventListener('click', enable_form);
        /* VALIDAR LOGIN */
        document.getElementById('btn-login').addEventListener('click', login_button);
        /* VALIDAR REGISTRO */
        document.getElementById('btn-register').addEventListener('click', register_button);
    }
}

window.onbeforeunload = () => {
    if(sessionStorage.getItem('saveCache') === 'false'){
        Logout();
    }
}

function errorEmail(){
    const element_input = document.getElementById('email');
    const element_label = document.getElementById('email_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_input.removeEventListener('input',null);
    });
}
function errorName() {
    const element_input = document.getElementById('name');
    const element_label = document.getElementById('name_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_input.removeEventListener('input',null);
    });
}
function errorLast_name() {
    const element_input = document.getElementById('last_name');
    const element_label = document.getElementById('last_name_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_input.removeEventListener('input',null);
    });
}
function errorAge(){
    const element_input = document.getElementById('age');
    const element_label = document.getElementById('age_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_input.removeEventListener('input',null);
    });
}
function errorNickname(){
    const element_input = document.getElementById('nickname');
    const element_label = document.getElementById('nickname_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_input.removeEventListener('input',null);
    });
}
function errorPassword(){
    const element_input = document.getElementById('password');
    const element_label = document.getElementById('password_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_input.removeEventListener('input',null);
    });
}