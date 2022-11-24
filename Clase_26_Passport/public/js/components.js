/*===========================COMPONENTES DEL CHAT========================*/
window.onload = async() => {
    const temp = Object.fromEntries(document.cookie.split(/; */).map(c => {
        const [ key, ...v ] = c.split('=');
        return [ key, decodeURIComponent(v.join('=')) ];
    }));
    author = JSON.parse(temp.data_user.substr(2,temp.data_user.length))
    console.log(temp);
    if(await checkLoginAlive()){
        const Response = await fetch('/api/login',{
            method: 'GET',
        });
        author = await Response.json();
        delete author.cookie;
        Login();
    }else{
        document.getElementById('username_login').addEventListener('keypress', (event) => {
            if(event.key === "Enter"){
                document.getElementById('password_login').select()
            }
        })
        document.getElementById('password_login').addEventListener("keypress", (event) => {
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

/*
*   Es importante que la función anónima sea async
*   porque de no serlo el navegador no esperará que se
*   termine el proceso.
*/
window.onbeforeunload = async() => {
    if(sessionStorage.getItem('saveCache') === 'false'){
        Logout();
    }
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

function errorEmail(){
    const element_input = document.getElementById('email');
    const element_label = document.getElementById('email_label');
    element_input.classList.add('error_input');
    element_label.classList.add('error_label');
    element_input.value = '';
    
    element_input.addEventListener('input', ()=>{
        element_input.classList.remove('error_input');
        element_label.classList.remove('error_label');
        element_label.innerHTML = 'Email'
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

