/*========================PETICIONES AL SERVIDOR===================================*/
/**
 * It sends a GET request to the server, which in turn sends a response, which is then processed by the
 * client
 */
async function Logout() {
    alert(`Hasta luego ${author.name}.\n\nCerrando sesión...`);
    sessionStorage.clear();
    reloadPage();
}

/**
 * This function checks if the user is logged in by sending a GET request to the server and returning
 * the response.
 * @returns {
 *     "status": "true"
 * }</code>
 */
async function checkLoginAlive() {
    const Response = await fetch("/api/SessionisActive", {
        method: "GET",
    });
    const jsonResponse = await Response.json();
    return jsonResponse.status;
}

async function DeleteUser(){
    const Response = await fetch('api/user', {
        method: 'DELETE'
    })
    const jsonResponse = await Response.json();
    return jsonResponse.status;
}

async function sendRegisterForm(user) {
    console.log(user);
    try{
        const Response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })
        const jsonResponse = await Response.json();
        console.log(jsonResponse);
        return jsonResponse.status;
    }catch(e){
        return false;
    }
}