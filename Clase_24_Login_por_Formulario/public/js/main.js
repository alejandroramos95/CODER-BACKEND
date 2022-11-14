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
