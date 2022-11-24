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
    alert(`Hasta luego ${author.name}.\n\nCerrando sesión...`);
    sessionStorage.clear();
    reloadPage()
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