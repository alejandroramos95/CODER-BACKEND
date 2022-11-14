/*========================MENSAJES===================================*/
async function renderMessage(chat){    
    console.log(chat.messages);
    const html = chat.messages.map((elemento) => {
    if(elemento.author.email == author.email){
        return `
            <div class="media media-chat media-chat-reverse">
            <div class="media-body">
                <p>${elemento.text}</p>
                <p class="meta"><time datetime="2018">${elemento.dateTime}</time></p>
                <p class="meta">${elemento.author.email}</p>
            </div>
            </div>`;
    }else{
        return `
            <div class="media media-chat">
            <img class="avatar" src="${elemento.author.avatar}" alt="Image" id="avatar-img">
            <div class="media-body">
                <p>${elemento.text}</p>
                <p class="meta"><time datetime="2018">${elemento.dateTime}</time></p>
                <p class="meta">${elemento.author.email}</p>
            </div>
            </div>`;
    }
    }).join('\n');
    document.getElementById('chat-content').innerHTML=html;
    document.getElementById('chat-content').scrollTop = document.getElementById('chat-content').scrollHeight;
}

/**
 * It checks if the user is logged in, if so, it sends the message to the server.
 * @param messageText - the message that the user is sending
 */
async function addMessage(messageText){
    if(await checkLoginAlive()){
        let temp = messageText;
        if(temp.replace(/\s/g, '').length != 0){
            const message = {
                email: author.email,
                text: messageText,
                dateTime: new Date().toLocaleString('es-PE'),
            }
            document.getElementById('send-message').value = "";
            socket.emit('nuevo-mensaje', message);
        }else{
            document.getElementById('send-message').value = "";
        }
    }else{
        alert('Su sesión ya no se encuentra activa');
        reloadPage()
    }
}