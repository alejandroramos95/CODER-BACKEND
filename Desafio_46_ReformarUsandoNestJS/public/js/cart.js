let subTotal = 0;

async function loadNavbar() {
    const response = await fetch('/api/navbar');
    const data = await response.text();
    document.querySelector('.navbar_api').innerHTML = data;
}
async function loadCart() {
    try {
        const response = await fetch('/api/cart/user');
        const data = await response.json();
        if (data.products.length > 0) renderItemsCart(data.products);
    } catch (err) {
        console.log('No se encontró un carrito de compras');
    }
}
async function getProduct(id) {
    const result = await fetch(`/api/product/${id}`);
    return await result.json();
}
function renderItemsCart(products) {
    const el = document.querySelector('#container_items');
    el.innerHTML = '';
    products.forEach(async (product) => {
        const infoProduct = await getProduct(product.productId);
        subTotal += Number(infoProduct.price * product.quantity);
        el.innerHTML += `
                    <div class="card-body p-4">

                        <div class="row align-items-center">
                        <div class="col-md-2">
                            <img src="${infoProduct.thumbnail}"
                            class="img-fluid" alt="Product img">
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted mb-4 pb-2">Name</p>
                            <p class="lead fw-normal mb-0">${infoProduct.title}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted mb-4 pb-2">Stock</p>
                            <p class="lead fw-normal mb-0">
                                ${infoProduct.stock}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted mb-4 pb-2">Quantity</p>
                            <p class="lead fw-normal mb-0">${product.quantity}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted mb-4 pb-2">Price</p>
                            <p class="lead fw-normal mb-0">${infoProduct.price}</p>
                            </div>
                        </div>
                        <div class="col-md-2 d-flex justify-content-center">
                            <div>
                            <p class="small text-muted mb-4 pb-2">Total</p>
                            <p class="lead fw-normal mb-0 subtotal">$799</p>
                            </div>
                        </div>
                        </div>

                    </div>
                `;
        renderSubTotal();
    });
}
function renderSubTotal() {
    const elms = document.querySelectorAll('.subtotal');
    elms.forEach((elm) => {
        elm.innerHTML = subTotal.toFixed(2);
    });
    const btn = document.querySelector('button[disabled]');
    btn.removeAttribute('disabled');
}
async function purchase() {
    const response = await fetch('/api/cart/', {
        method: 'DELETE',
    });
    const data = await response.json();
    if (data._id) {
        alert('Compra realizada con exito');
        window.location.href = '/products';
    } else {
        alert('Error al realizar la compra');
    }
}
loadNavbar();
loadCart();
