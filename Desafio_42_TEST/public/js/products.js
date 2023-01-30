/*========================PRODUCTOS===================================*/
function footer(){
    fetch('/api/products-view',{
        method: 'GET',
    }).then(function (html) {
        return html.text();
    }).then(function (footer) {
        renderProduct(footer);
    }).catch(function (error) {
        console.log(error);
    });
}

function renderProduct(footer) {
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