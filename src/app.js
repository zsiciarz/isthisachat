document.addEventListener('DOMContentLoaded', () => {
    let socket = new WebSocket("ws://127.0.0.1:6639");
    let chat = document.getElementById('chat');
    let chatInput = document.getElementById('chat-input');
    let message = document.getElementById('message');
    chatInput.addEventListener('submit', e => {
        socket.send(message.value);
        message.value = '';
        e.preventDefault();
    });
    socket.addEventListener('message', e => {
        let li = document.createElement('li');
        li.textContent = e.data;
        chat.appendChild(li);
        li.scrollIntoView(false);
    });
});

