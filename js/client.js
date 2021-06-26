const socket = io(`http://localhost:8000`);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');




const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }

}
const neme = prompt("Enter your name to join ");
socket.emit('new-user-joined', neme);


socket.on('user-joined', neme => {
    append(`${neme} joined the chat`, 'right');
})
socket.on('receive', data => {
    append(`${data.neme} : ${data.message}`, 'left');
})
socket.on('left', neme => {
    append(`${neme} left the chat `, 'left');
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})