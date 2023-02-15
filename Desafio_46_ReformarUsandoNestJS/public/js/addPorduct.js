const loadNavbar = async () => {
    const response = await fetch('/api/navbar');
    const data = await response.text();
    document.querySelector('.navbar_api').innerHTML = data;
};
loadNavbar();
document
    .getElementById('myForm')
    .addEventListener('submit', async function (e) {
        e.preventDefault();
        const full_title = document.querySelector('#full_title_input').value;
        const title = document.querySelector('#title_input').value;
        const price = document.querySelector('#price_input').value;
        const stock = document.querySelector('#stock_input').value;
        const thumbnail = document.querySelector('#thumbnail_input').value;
        const description = document.querySelector('#description_area').value;
        //trim para eliminar espacios en blanco
        if (
            full_title.trim() === '' ||
            title.trim() === '' ||
            price.trim() === '' ||
            stock.trim() === '' ||
            thumbnail.trim() === '' ||
            description.trim() === ''
        ) {
            alert('Todos los campos son obligatorios');
            return;
        }
        const product = {
            full_title,
            title,
            price,
            stock,
            thumbnail,
            description,
        };
        const response = await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        console.log(data);
        if (data._id) {
            alert('Producto agregado con éxito');
            window.location.href = '/products';
        } else {
            alert('Error al agregar el producto');
            if (data.message) {
                data.message.forEach((error) => {
                    alert(error);
                });
            }
        }
    });
