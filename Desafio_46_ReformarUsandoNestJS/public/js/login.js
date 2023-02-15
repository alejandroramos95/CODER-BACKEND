// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function validateForm() {
    const password = document.forms['myForm']['password'].value;
    const confirmPassword = document.forms['myForm']['email'].value;
    if (password.trim() < 1) {
        return alert('La contraseña no puede estar vacia.');
    } else if (confirmPassword.trim() < 1) {
        return alert('El email no puede estar vacio.');
    }
    //values of the form to json
    const form = document.getElementById('myForm');
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    return sendForm(value);
}

const sendForm = async (form) => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    if ((await response.status) == 201) {
        return (window.location.href = '/');
    } else if ((await response.status) == 401) {
        return alert('Credenciales incorrectas.');
    } else {
        return alert('Error al intentar inciar sesión.');
    }
};
