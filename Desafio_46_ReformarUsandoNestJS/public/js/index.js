window.onload = async () => {
    const response = await fetch('/api/navbar');
    const data = await response.text();
    document.querySelector('.navbar_api').innerHTML = data;
};
