// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function validateForm() {
    const password = document.forms['myForm']['password'].value;
    const confirmPassword = document.forms['myForm']['confirmPassword'].value;
    if (password != confirmPassword) {
        return alert('Las contraseñas no coinciden.');
    }
    //values of the form to json
    const form = document.getElementById('myForm');
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());
    if (value.avatar == '') {
        value.avatar =
            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    }
    return sendForm(value);
}

const sendForm = async (form) => {
    const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });
    if ((await response.status) == 201) {
        return (window.location.href = '/login');
    } else {
        return alert('Error al crear la cuenta.');
    }
};
