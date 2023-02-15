window.onload = async () => {
    const result = await fetch('/api/product');
    const data = await result.json();
    const elm = document.querySelector('#product-list');
    data.forEach((product) => {
        elm.innerHTML += `
            <div class='col-md-6'>
                <div
                    class='block product no-border z-depth-2-top z-depth-2--hover'
                >
                    <div class='block-image'>
                        <img
                            src='${product.thumbnail}'
                            class='img-center'
                        />
                        <span
                            class='product-ribbon product-ribbon-right product-ribbon--style-1 bg-blue text-uppercase'
                        >New</span>
                    </div>
                    <div class='block-body text-center'>
                        <h3
                            class='heading heading-5 strong-600 text-capitalize'
                        >
                            <a href='#'>
                                ${product.title}
                            </a>
                        </h3>
                        <p class='product-description'>
                            ${product.description}
                        </p>
                        <div class='product-colors mt-2'>
                            <div class='color-switch float-wrapper'>
                                <a href='#' class='bg-purple'></a>
                                <a href='#' class='bg-pink'></a>
                                <a href='#' class='bg-blue'></a>
                            </div>
                        </div>
                        <div class='product-buttons mt-4'>
                            <div class='row align-items-center'>
                                <div class='col-2'>
                                    <button
                                        type='button'
                                        class='btn-icon'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title=''
                                        data-original-title='Favorite'
                                    >
                                        <i class='fa fa-heart'></i>
                                    </button>
                                </div>
                                <div class='col-2'>
                                    <button
                                        type='button'
                                        class='btn-icon'
                                        data-toggle='tooltip'
                                        data-placement='top'
                                        title=''
                                        data-original-title='Compare'
                                    >
                                        <i class='fa fa-share'></i>
                                    </button>
                                </div>
                                <div class="col-2">
                                    <label>$${product.price}</label>
                                </div>
                                <div class='col-6'>
                                    <button
                                        type='button'
                                        class='btn btn-block btn-primary btn-circle btn-icon-left btn-to-cart'
                                        data-target='${product._id}'
                                    >
                                        <i
                                            class='fa fa-shopping-cart'
                                        ></i>Add to cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    const elems = document.querySelectorAll('.btn-to-cart');
    elems.forEach((elem) => {
        elem.addEventListener('click', async (e) => {
            await addToCart(e);
        });
    });
};

async function loadNavbar() {
    const response = await fetch('/api/navbar');
    const data = await response.text();
    document.querySelector('.navbar_api').innerHTML = data;
}
async function addToCart(e) {
    const id = e.target.dataset.target;
    if (!id)
        return alert(
            'No se pudo agregar el producto al carrito. Intenta de nuevo',
        );
    const response = await fetch(`/api/cart/product/${id}`, {
        method: 'POST',
    });
    const data = await response.json();
    if (data.statusCode === 403) {
        window.location.href = '/login';
    } else {
        const cart_quantity = document.getElementById('cart_quantity');
        if (cart_quantity) {
            cart_quantity.innerHTML = parseInt(cart_quantity.innerHTML) + 1;
        } else {
            document.getElementById(
                'cart_logo',
            ).innerHTML += `<span class="badge rounded-pill badge-notification bg-danger" id="cart_quantity">1</span>`;
        }
    }
}
loadNavbar();
