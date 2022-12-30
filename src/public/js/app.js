const socket = io();
const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");
const room = document.querySelector("#room");

room.hidden = true;
let roomName;

function handleNameSubmit(event) {
    event.preventDefault();
    const nameInput = room.querySelector("#name input");
    socket.emit("userName", nameInput.value);
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const msgInput = room.querySelector("#msg input");
    const value = msgInput.value;
    socket.emit("newMessage", msgInput.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    msgInput.value = "";
}

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h2 = room.querySelector("h2");
    h2.innerText = `Room: ${roomName}`;
    const msgForm = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgForm.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNameSubmit);
}

// function testFunc(msg) {
//     console.log(msg);
// }
function handleRoomSubmit(event) {
    event.preventDefault();
    const userNameInput = form.querySelector("#userName");
    const roomNameInput = form.querySelector("#roomName");
    //개발자가 직접 event명을 지정할 수 있음. enter_room 이름의 이벤트를 전송
    socket.emit(
        "enter_room",
        userNameInput.value,
        roomNameInput.value, //websocket과 달리 무조건 string이 아니어도 됨
        showRoom
        // testFunc,
        // "hello"
    );
    roomName = roomNameInput.value;
    roomNameInput.value = "";
}

form.addEventListener("submit", handleRoomSubmit);
socket.on("welcome", (user) => {
    addMessage(`${user} joined!`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left!`);
});

socket.on("newMessage", addMessage);
