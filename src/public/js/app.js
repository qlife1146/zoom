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

//이름의 입력을 받는 function
function handleNameSubmit(event) {
    event.preventDefault();
    const name = nameForm.querySelector("#name");
    socket.send(makeMessage("name", name.value));
}

//메시지 입력을 받는 function
function handleMessageSubmit(event) {
    event.preventDefault();
    const message = messageForm.querySelector("#message");
    // const name = messageForm.querySelector("#name");
    // socket.send(`${name.value}: ${message.value}`);
    // 도움 없이 닉네임 설정 해봤는데 작동된다. 오예
    // socket.send(name.value);
    // console.log(input.value);
    socket.send(makeMessage("new_message", message.value));
    message.value = "";
}

//채팅 내용과 닉네임의 차이를 백엔드는 모르기에 나눠주기 위한 function
function makeMessage(type, payload) {
    //서버가 JS가 아닌 JAVA 서버일 수도 있기에 JS object가 아닌 string으로 변환
    const msg = { type, payload };
    return JSON.stringify(msg); //msg를 JSON(=string) 형태로 바꿈
}

//버튼 function
nameForm.addEventListener("submit", handleNameSubmit);
messageForm.addEventListener("submit", handleMessageSubmit);

//백엔드로 보냄
// setTimeout(() => {
//     socket.send("hello from the browser.");
// }, 3000);


//TODO: 닉네임 submit 없이도 받을 수 있도록 바꾸기. server에서 default로 바꾸기
