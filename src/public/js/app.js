//backend 접속
const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const nameForm = document.querySelector("#name");
const messageForm = document.querySelector("#message");

//백엔드의 연결이 open일 때 사용하는 listener
socket.addEventListener("open", () => {
    console.log("Connected to Server ✅");
});

//백엔드의 message를 받았을 때 사용하는 listener
socket.addEventListener("message", (message) => {
    // console.log(`message: ${message.data}`);
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

//백엔드의 연결이 close일 때 사용하는 listener
socket.addEventListener("close", () => {
    console.log("Closed");
});

function handleNameSubmit(event) {
    event.preventDefault();
    const name = nameForm.querySelector("#name");
    socket.send({
        type: "name",
        payload: name.value,
    });
}

function handleMessageSubmit(event) {
    event.preventDefault();
    const message = messageForm.querySelector("#message");
    // const name = messageForm.querySelector("#name");
    // socket.send(`${name.value}: ${message.value}`);
    // 도움 없이 닉네임 설정 해봤는데 작동된다. 오예
    // socket.send(name.value);
    // console.log(input.value);
    socket.send(message.value);
    message.value = "";
}

nameForm.addEventListener("submit", handleNameSubmit);
messageForm.addEventListener("submit", handleMessageSubmit);

//백엔드로 보냄
// setTimeout(() => {
//     socket.send("hello from the browser.");
// }, 3000);
