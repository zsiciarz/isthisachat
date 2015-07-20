document.addEventListener('DOMContentLoaded', function () {
    var socket = new WebSocket("ws://127.0.0.1:6639");
    var chat = document.getElementById('chat');
    var chatInput = document.getElementById('chat-input');
    var message = document.getElementById('message');
    chatInput.addEventListener('submit', function (e) {
        socket.send(message.value);
        message.value = '';
        e.preventDefault();
    });
    socket.onmessage = function (event) {
        var li = document.createElement('li');
        li.textContent = event.data;
        chat.appendChild(li);
        li.scrollIntoView(false);
    };
});

