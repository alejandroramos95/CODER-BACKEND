// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function validateForm() {
    loadAnimation(true);
    const password = document.forms['myForm']['password'].value;
    const confirmPassword = document.forms['myForm']['email'].value;
    if (password.trim() < 1) {
        loadAnimation(false);
        return alert('La contraseña no puede estar vacia.');
    } else if (confirmPassword.trim() < 1) {
        loadAnimation(false);
        return alert('El email no puede estar vacio.');
    }
    //values of the form to json
    const form = document.getElementById('myForm');
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    return sendForm(value);
}

function loadAnimation(conf) {
    if (conf) {
        document.getElementById('spinner_btn').style.display = 'inline-block';
        document.getElementById('text_btn').innerHTML = 'Validando...';
    } else {
        document.getElementById('spinner_btn').style.display = 'none';
        document.getElementById('text_btn').innerHTML = 'Iniciar Sesión';
    }
}

const sendForm = async (form) => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    const data = await response.json();
    if ((await data.status) == 200) {
        return (window.location.href = '/');
    } else if (response.status == 401) {
        loadAnimation(false);
        return alert('Credenciales incorrectas.');
    } else {
        loadAnimation(false);
        return alert('Error al intentar inciar sesión.');
    }
};
